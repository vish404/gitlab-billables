import { auth } from "@/auth";
import axios from "axios";
import moment from "moment";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

// Axios Interceptor Instance
const gitlabApi = axios.create({
  baseURL: process.env.GITLAB_URL + "/api/v4/",
});

gitlabApi.interceptors.request.use(
  async (config) => {
    const session = await auth();
    const accessToken = session.accessToken;

    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

gitlabApi.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    if (error.status == undefined) {
      return Promise.reject(error);
    }

    if ([401].includes(error.status)) {
      redirect("/logout");
    }

  }
);

export const getProject = async (projectID) => {
  return gitlabApi.get(`projects/${projectID}?per_page=100`);
};

export const getIssues = async (
  projectID,
  label,
  state = "closed",
  startDate = null,
  endDate = null
) => {
  startDate =
    startDate || moment().subtract(0, "months").startOf("month").toISOString();

  endDate =
    endDate || moment().subtract(0, "months").endOf("month").toISOString();

  return gitlabApi.get(
    `projects/${projectID}/issues?labels=${label}&state=${state}&updated_after=${startDate}&updated_before=${endDate}&per_page=100`
  );
};

export const getRelatedMergeRequests = async (projectID, issueIid) => {

  return gitlabApi.get(
    `projects/${projectID}/issues/${issueIid}/related_merge_requests`
  );
};

export const getBillableIssues = async () => {
  let issues = [];
  const projects = [];
  for (const projectId of process.env.GITLAB_PROJECTS.split(",")) {
    for (const label of process.env.GITLAB_LABELS.split(",")) {
      try {
        const issuesResponse = await getIssues(projectId, label);
        if (issuesResponse) {
          issues = [...issues, ...issuesResponse.data];
        }
      } catch (e) {
        // console.log(e);
      }
    }
  }

  issues = [...new Map(issues.map((item) => [item.id, item])).values()];

  const result = [];
  for (const issue of issues) {
    if (issue.merge_requests_count == 0) {
      continue;
    }
    try {
      const { data: mergeRequests } = await getRelatedMergeRequests(
        issue.project_id,
        issue.iid
      );

      const users = [];
      users.push(issue.assignee);

      for (const mr of mergeRequests) {
        users.push(mr.merge_user);
        mr.reviewers.map((item) => users.push(item));
      }
      const time_percentage = 
      result.push({
        id: issue.id,
        iid: issue.iid,
        assignee: issue.assignee,
        title: issue.title,
        closed_at: issue.closed_at,
        labels: issue.labels,
        time_percentage: issue.time_stats.total_time_spent / issue.time_stats.time_estimate * 100,
        time_stats: issue.time_stats,
        web_url: issue.web_url,
        users: [...new Map(users.map((item) => [item.id, item])).values()],
      });
    } catch (e) {
    //   console.log(e);
    }
  }

  return result;
};
export default gitlabApi;

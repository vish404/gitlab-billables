import { auth } from "@/auth";
import { getBillableIssues } from "@/utils/gitlabApi";
import {
  Anchor,
  Avatar,
  Badge,
  Card,
  Group,
  Progress,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
  TextInput,
} from "@mantine/core";
import moment from "moment";

export default async function Home({ searchParams }) {
  const session = await auth();
  const issues = await getBillableIssues();
  return (
    <Card>
      <Table striped>
        <TableThead>
          <TableTr>
            <TableTh>Issue</TableTh>
            <TableTh>Users</TableTh>
            <TableTh>Time usage</TableTh>
            <TableTh>Estimated</TableTh>
            <TableTh>Spent</TableTh>
            <TableTh>Closed at</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {issues.map((issue) => (
            <TableTr key={issue.id}>
              <TableTd>
                <Stack gap='xs'>
                <Anchor target="_blank" href={issue.web_url}>
                  {issue.title}
                </Anchor>
                <Group>
                  {issue.labels.map(label => <Badge color="gray" size="xs" radius="sm">{label}</Badge>)}
                </Group>
                </Stack>
              </TableTd>
              <TableTd>
                {issue.users.map((user) => (
                  <Group>
                    <Avatar
                      src={user.avatar_url}
                      alt={user.name}
                      radius="xl"
                      size={30}
                    />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {user.name}
                    </Text>
                  </Group>
                ))}
              </TableTd>
              <TableTd>
                <Progress title={issue.time_percentage} value={issue.time_percentage}/>
              </TableTd>
              <TableTd>
              {issue.time_stats.human_time_estimate}
              </TableTd>
              <TableTd>
              {issue.time_stats.human_total_time_spent}
              </TableTd>
              <TableTd>
              {moment(issue.closed_at).format("YYYY-MM-DD HH:mm:ss")}
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </Card>
  );
}

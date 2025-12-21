import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Activity {
  id: number;
  activity: string;
  time: string;
  value: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  const theme = useTheme();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Recent Activity
        </Typography>
        <List sx={{ pt: 0 }}>
          {activities.map((activity, index) => (
            <ListItem
              key={activity.id}
              sx={{
                px: 0,
                borderBottom:
                  index !== activities.length - 1
                    ? `1px solid ${theme.palette.divider}`
                    : "none",
              }}
            >
              <ListItemText
                primary={activity.activity}
                secondary={activity.time}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
              <Chip
                label={activity.value}
                size="small"
                sx={{
                  bgcolor: `${theme.palette.primary.main}15`,
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

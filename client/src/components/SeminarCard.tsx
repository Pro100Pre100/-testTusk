import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { seminarCardProps } from '../interfaces/seminars'

export default function SeminarCard({ img, title, description, handleDelete, handleEdit }: seminarCardProps) {

  return (
    <Card sx={{ minHeight: '400px', minWidth: '265px', position: 'relative' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={img}
        title="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom variant="h5"
          component="div"
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ position: 'absolute', bottom: 0, width: '100%', background: 'white' }}>
        <Button size="small" variant="contained" sx={{ background: '#1976d2', color: 'white', width: 40, height: 40 }} onClick={handleEdit}>Edit</Button>
        <Button size="small" variant="contained" sx={{ background: '#ba4040', color: 'white', width: 40, height: 40 }} onClick={handleDelete}>Delete</Button>
      </CardActions>
    </Card>
  )
}

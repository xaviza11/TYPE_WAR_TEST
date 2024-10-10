For run tests first insert this documents:

texts: 
{
  "_id": {
    "$oid": "66d23635f46de3ef5b01b0a0"
  },
  "title": "J-F",
  "text": "jfjf fjfj jfjf fjfj jfjf fjfj jfjf fjfj jfjf fjfj jfjf fjfj jfjf fjfj fjfj jfjf fjfj jfjf fjfj jfjf fjfj jfjf fjfj jfjf fjfj jfjf fjfj jfjf jfjf fjfj jfjf fjfj jfjf fjfj jfjf fjfj jfjf fjfj\n",
  "type": "exercise",
  "language": "all",
  "createdAt": {
    "$date": "2024-08-30T21:14:29.506Z"
  },
  "updatedAt": {
    "$date": "2024-08-30T21:14:29.506Z"
  },
  "__v": 0
}

users:
{
  "_id": {
    "$oid": "66f3c32f637e32db75a09ce0"
  },
  "email": "admin@admin.com",
  "name": "admin",
  "password": "$2b$10$Ym/PGSL2iOpdtqZiINNBr.QpBM8J0k.FtzGjG.tcxCTj2VBMK3R8i",
  "confirmed": false,
  "userType": "admin",
  "createdAt": {
    "$date": "2024-09-25T08:00:47.871Z"
  },
  "updatedAt": {
    "$date": "2024-09-25T08:00:47.871Z"
  },
  "__v": 0
}

completedExercises: 
{
  "_id": {
    "$oid": "66f3c32f637e32db75a09ce0"
  },
  "email": "admin@admin.com",
  "name": "admin",
  "password": "$2b$10$Ym/PGSL2iOpdtqZiINNBr.QpBM8J0k.FtzGjG.tcxCTj2VBMK3R8i",
  "confirmed": false,
  "userType": "admin",
  "createdAt": {
    "$date": "2024-09-25T08:00:47.871Z"
  },
  "updatedAt": {
    "$date": "2024-09-25T08:00:47.871Z"
  },
  "__v": 0
}

next execute 
-- npm run test
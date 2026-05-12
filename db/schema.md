# 📂 Billify Firestore Schema

## 1. Users Collection (`/users/{uid}`)
- `uid`: String (Primary Key)
- `displayName`: String
- `email`: String
- `photoURL`: String
- `createdAt`: Timestamp

## 2. Groups Collection (`/groups/{groupId}`)
- `groupId`: String
- `name`: String
- `createdBy`: String (User UID)
- `members`: Array [User UIDs]
- `inviteCode`: String (Unique 6-char)

## 3. Expenses Collection (`/expenses/{expenseId}`)
- `groupId`: String
- `description`: String
- `amount`: Number
- `paidBy`: String (User UID)
- `splitType`: String ("equal", "percentage", "custom")
- `splits`: Map (UID -> Amount)

## 4. Settlements Collection (`/settlements/{id}`)
- `groupId`: String
- `from`: String (UID)
- `to`: String (UID)
- `amount`: Number
- `timestamp`: Timestamp
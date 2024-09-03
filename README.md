## To Run app locally




# Tasks:
   - Transaction
   - Use Firebase for files and media.
   - Media Async Issue.
   - Use Patch


## Controllers

### 1. **AuthController**
   - **register**: Handle user registration.
   - **login**: Authenticate users and generate tokens.
   - **logout**: Invalidate user sessions or tokens.
   - **forgotPassword**: Handle password reset requests.
   - **verifyOtp**: Verifies the OTP
   - **resetPassword**: Allow users to set a new password.

### 2. **UserController**
   - **getUserProfile**: Retrieve user profile information.
   - **updateProfile**: Update user profile details (e.g., profile picture, status).
   - **searchUsers**: Search for users by username or other criteria.
   - **blockUser**: Block a specific user.
   - **reportUser**: Report a user for inappropriate behavior.

### 3. **ChatController**
   - **createChat**: Create a new chat (one-on-one).
   - **getChatHistory**: Retrieve message history for a specific chat.
   - **getAllChats**: Retrieve a list of all chats for a user.

### 4. **MessageController**
   - **sendMessage**: Handle sending messages (text, images, files).
   - **editMessage**: Allow users to edit their sent messages.
   - **deleteMessage**: Allow users to delete their messages.
   - **getMessages**: Retrieve messages for a specific chat (for lazy loading or pagination).

### 5. **MediaController**
   - **uploadFile**: Handle file uploads (images, videos, etc.).
   - **deleteFile**: Allow users to delete shared files.

### 6. **NotificationController**
   - **getNotifications**: Retrieve a list of notifications for the user.
   - **markAsRead**: Mark notifications as read.

### 7. **GroupController**
   - **createGroup**: Create a new group chat.
   - **updateGroup**: Update group information (e.g., name, description).
   - **deleteGroup**: Delete a group chat.
   - **getGroupMembers**: Retrieve the list of members in a group chat.
   - **addUserToGroup**: Add a user to a group chat.
   - **removeUserFromGroup**: Remove a user from a group chat.

### 8. **PresenceController**
   - **updateStatus**: Update the user’s online/offline status.
   - **getUserStatus**: Retrieve the online status of a specific user.

### 9. **SearchController**
   - **searchMessages**: Search messages within a chat or across chats.
   - **searchChats**: Search for chats based on keywords.

### Example Structure

```
/controllers
  ├── authController.js
  ├── userController.js
  ├── chatController.js
  ├── messageController.js
  ├── mediaController.js
  ├── notificationController.js
  ├── groupController.js
  ├── presenceController.js
  └── searchController.js
```

### uploads folder Structure
```
./uploads
   ├──groupIcon
   ├──────compressed
   ├──────original
   ├──media
   ├──────audio
   ├──────file
   ├──────images
   ├──────────compressed
   ├──────────original
   ├──────video
   ├──────────original
   ├──────────thumbnail
   ├──profile
   ├──────compressed
   ├──────original
```
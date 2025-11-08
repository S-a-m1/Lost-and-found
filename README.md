# Lost & Found

A community-driven web application to help reunite lost items with their owners.

## Features

### 🔐 User Account System
- **Sign Up**: Create an account with name, email, phone, and password
- **Login**: Secure login to access all features
- **Profile Management**: View and manage your posted items

### 📝 Post Items
Users can report lost or found items with:
- Item name and detailed description
- Location where item was lost/found
- Date of incident
- Contact information

### 🔍 Browse & Search
- View all lost and found items in the community
- Filter by item type (Lost/Found)
- Search by item name, description, or location
- Real-time search results

### 🎨 Clean & Friendly UI
- Modern, responsive design
- Mobile-friendly interface
- Intuitive navigation
- Easy-to-use forms

## Getting Started

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/S-a-m1/Lost-and-found.git
cd Lost-and-found
```

2. Start a local web server:
```bash
# Using Python 3
python3 -m http.server 8080

# Or using Node.js
npx http-server -p 8080
```

3. Open your browser and navigate to:
```
http://localhost:8080
```

## Usage

1. **Create an Account**: Click "Sign Up" to create your account
2. **Post an Item**: Once logged in, click "Post Item" to report a lost or found item
3. **Browse Items**: Visit "Browse Items" to see all posted items
4. **Search**: Use the search bar to find specific items
5. **Manage Profile**: Click on your name to view your profile and manage your posts

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Storage**: Browser LocalStorage
- **Design**: Responsive CSS with modern styling

## Security Notes

⚠️ **Important**: This is a demonstration application using client-side storage.

- Passwords are stored in plain text in LocalStorage (for demo purposes only)
- In production, implement:
  - Server-side authentication
  - Password hashing (bcrypt, argon2)
  - Secure session management
  - HTTPS encryption
  - Input validation and sanitization

## Future Enhancements

- Email notifications
- Image uploads for items
- Advanced filtering and sorting
- Map integration for locations
- User verification system
- Messaging between users
- Item status updates (found/claimed)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is open source and available for educational purposes.
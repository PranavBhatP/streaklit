# StreakLit - A modern-day web streak tracker app.

Streak Tracker is a web application designed to help users create and maintain streaks for their favorite websites. Users can set a target streak length, track their progress, and increment their streak length once per day.

Video Link: [YouTube] (https://www.youtube.com/watch?v=1iD5E9Tgo6Q)

## Features

- **Create Streaks**: Users can create streaks by providing the website URL, website name, and target streak length.
- **Track Streaks**: Users can view their current streaks, including the progress towards their target.
- **Increment Streaks**: Users can increment their streak length once per day by clicking a button.
- **User Authentication**: Secure user authentication to manage individual user streaks.

## Technology Stack

- **Frontend**: React with Next.js
- **Backend**: Node.js with Next.js API routes
- **Database**: [MongoDB with Mongoose](https://www.mongodb.com/)
- **Styling**: Tailwind CSS
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **CDN**: [UploadThing](https://uploadthing.com/)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/PranavBhatP/streaklit.git
    ```
2. Navigate to the project directory:
    ```sh
    cd streaklit
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Set up environment variables:
    Create a `.env.local` file in the root directory and add your MongoDB connection string and other necessary environment variables.
    1. JWT_SECRET
    2. NEXTAUTH_URL
    3. NEXTAUTH_SECRET
    4. JWT_SECRET
    5. DATABASE_URI (provided by MongoDB Atlas)

5. Run the development server:
    ```sh
    npm run dev
    ```

## Usage

- Navigate to the application in your browser.
- Sign up or log in to your account.
- Use the sidebar to create a new streak.
- Track your progress and increment your streak daily.
- Upload images of progress and certificates obtained on your tracked websites.

## API Endpoints

- **Create Streak**: `POST /api/streak`
- **Delete Streak**: `DELETE /api/streak/[id]`
- **Increment Streak**: `PUT /api/streak/[id]/increment`
- **Get Streak**: `GET /api/streak/[id]`

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any changes or improvements.
Here is a list of upcoming features for this project you can contribute to:
- [X] Building a chrome extension to automatically track website visits, rather than having the user manually enter data.
- [X] Feature where user can save all his/her online achievement data such as images of certificates or screenshots as proof. Provides a location to consolidate this data, allowing users to produce them at will, when required.
- [ ] An activity calendar heatmap to display streak data. (Work in progress).
- [ ] Containarize the application using Docker.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please contact this [Email](mailto:pranavbhat2004@gmail.com).


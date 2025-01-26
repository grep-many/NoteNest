const menuItems = [
    {
        icon: BarChart,
        label: 'Dashboard',
        value: 'dashboard',
        component: <InstructorDashboard listOfCourses={instructorCoursesList} />
    },
    {
        icon: Book,
        label: 'Courses',
        value: 'courses',
        component: <InstructorCourses listOfCourses={instructorCoursesList} />
    },
    {
        icon: SearchCode,
        label: 'Explore',
        value: 'explore',
        component: <StudentViewCoursesPage />
    },
    {
        icon: TvMinimalPlay,
        label: 'Purchased',
        value: 'purchased',
        component: <StudentCoursesPage />
    },
    {
        icon: LogOut,
        label: 'Logout',
        value: 'logout',
        component: null
    },
];
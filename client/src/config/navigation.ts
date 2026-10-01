export interface NavItem {
    label: string;
    path: string;
}

export const MAIN_NAV: NavItem[] = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Login", path: "/login" },
    { label: "Sign Up", path: "/signup" }
];

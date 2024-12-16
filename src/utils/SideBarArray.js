export function generateRandomId(length = 2) {
  return Math.random().toString(36).substr(0, length);
}

export const sideBarArray = [
  {
    id: generateRandomId(),
    title: "Dashboard",
    link: "/",
    icon: "bx bx-home",
  },
  {
    id: generateRandomId(),
    title: "Employees",
    link: "/employees",
    icon: "bx bx-note",
  },
  {
    id: generateRandomId(),
    title: "Templates",
    link: "/templates",
    icon: "bx bx-note",
  },
  {
    id: generateRandomId(),
    title: "Documents",
    link: "/documents",
    icon: "bx bx-note",
  },
];
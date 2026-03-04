import { redirect } from "next/navigation";

export default function PagesIndex() {
  // Default docs entrypoint: send /pages to the rules page
  redirect("/pages/rules");
}

import React from "react";
import { PrimarySearchAppBar } from "./Header/Header";

export default function Tasks({ isLogin }: Props) {
  return (
    <div>
      <PrimarySearchAppBar messageCount={11} notificationCount={1} />
      Tasks
    </div>
  );
}

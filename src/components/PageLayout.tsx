import React from "react";
import { Link } from "react-router-dom";

export function PageLayout (props: {children: React.ReactNode}) {
  return (
    <div className="Page">
      <header className="Page-head">
        <Link to="/" className="Page-back" >Back</Link>
      </header>
      <main className="Page-body">{props.children}</main>
    </div>
  )
}

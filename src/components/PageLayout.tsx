import React from "react";
import { Link } from "react-router-dom";
import { audioService } from "../assets/soundsMap";
import "./PageLayout.scss"

export function PageLayout (props: {title: string; children: React.ReactNode}) {
  return (
    <div className="Page">
      <header className="Page-head">
        <Link to="/" className="Page-back" onClick={() => {
          audioService.abortIfPlaying();
        }}>INDIETRO</Link>
        <h1 className="Page-title">{props.title}</h1>
      </header>
      <main className="Page-body">{props.children}</main>
    </div>
  )
}

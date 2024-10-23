import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <section className="py-10 bg-slate-800 border border-t-2 border-t-black">
      <div className="z-10 px-4 flex items-center justify-center">
              <div>
                <p className="text-sm text-cyan-500">
                  &copy; Copyright 2024. All Rights Reserved by Himanshu Pantwal
                </p>
              </div>
          </div>
    </section>
  )
}

export default Footer
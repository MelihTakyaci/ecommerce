'use client'

import React, { useEffect, useState } from 'react'

import classes from './index.module.scss'

const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const calculateNextSunday = () => {
    const today = new Date()
    const dayOfWeek = today.getDay() // 0 is Sunday, 1 is Monday, and so on
    const daysUntilNextSunday = (7 - dayOfWeek + 1) % 7 // Calculate days until next Sunday
    const nextSunday = new Date(today)
    nextSunday.setDate(today.getDate() + daysUntilNextSunday)
    nextSunday.setHours(0, 0, 0, 0) // Set time to midnight

    return nextSunday
  }

  const targetDate = calculateNextSunday()

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date()
      const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0)

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      setTime({ days, hours, minutes, seconds })

      if (timeDifference === 0) {
        clearInterval(timerInterval)
        // You can add code here to handle what happens when the target date is reached.
      }
    }, 1000)

    return () => {
      clearInterval(timerInterval) // Cleanup the interval when the component unmounts.
    }
  }, [targetDate])

  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Deals of the Week</h3>
        <p>
          Explore our 'Deals of the Month' for curated excellence! Discover exclusive discounts and
          top-notch products across fashion, tech, and more. Don't miss out on this month's best
          picks! 🛍️✨
        </p>
        <h5>Until the</h5>
        <ul className={classes.stats}>
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </ul>
      </div>
    </section>
  )
}

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className={classes.statBox}>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
)

export default Promotion

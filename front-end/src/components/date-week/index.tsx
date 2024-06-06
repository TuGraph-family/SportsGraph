import { getDayOfWeek } from "@/utils";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import "./index.less";

interface DateWeekProps {
  fullDate?: string;
}

const DateWeek: React.FC<DateWeekProps> = ({ fullDate }) => {
  if (!fullDate) {
    return null;
  }

  const { date, week, time } = useMemo(() => {
    return {
      date: dayjs(fullDate).format("MM.DD"),
      week: getDayOfWeek(fullDate),
      time: dayjs(fullDate).format("HH:ss")
    };
  }, [fullDate]);

  return (
    <div className="date-week">
      <div className="date-week-item">{date}</div>
      <div className="date-week-item">{week}</div>
      <div>{time}</div>
    </div>
  );
};

export default DateWeek;

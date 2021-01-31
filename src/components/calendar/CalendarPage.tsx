import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { DatePicker, Typography, Button } from "antd";
import NotesList from "../notes/NotesList";
import moment from "moment";
import * as paths from "../../router/paths";

const dateFormat = "YYYY-MM-DD";
const { Title } = Typography;

interface CalendarPageProps {}

const CalendarPage: FC<CalendarPageProps> = () => {
  const [chosenDate, setChosenDate] = useState(
    moment(Date.now()).format(dateFormat)
  );
  const changeDate = (value: any) => {
    setChosenDate(moment(value).format(dateFormat));
  };
  return (
    <div>
      <Title level={3}>Kalendarz</Title>
      <DatePicker onChange={changeDate} />
      <NotesList />
      <Link to={paths.ADD_NOTE}>
        <Button type="primary"> dodaj notatkę </Button>
      </Link>
    </div>
  );
};
export default CalendarPage;

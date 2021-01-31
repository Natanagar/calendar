import React, { FC, useState } from "react";
import { Typography } from "antd";
import MyNote from "./MyNote";

const { Title } = Typography;

interface NotesListProps {}

const NotesList: FC<NotesListProps> = () => {
  const [personalNotes, setPersonalNotes] = useState<any[] | undefined>([]);
  console.log(setPersonalNotes);
  return (
    <div>
      <Title level={3}>My personal notes</Title>
      {personalNotes?.map((item: any, index: number) => (
        <MyNote key={index} item={item} />
      ))}
    </div>
  );
};
export default NotesList;

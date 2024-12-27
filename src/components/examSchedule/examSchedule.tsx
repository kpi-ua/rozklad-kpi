import dayjs from 'dayjs';
import {
  CardDate,
  CardMainData,
  CardWrapper,
  Date,
  DateWrapper,
  DaysLeft,
  DividerRed,
  Location,
  Subject,
  Teacher,
  Year,
} from './exam.style';
import teacherIcon from '../../assets/icons/teacher.svg';
import locationIcon from '../../assets/icons/location.svg';
import clock from '../../assets/icons/clock.svg';
import { Flex, Pictogram } from '../../common/styles/styles';
import { Exam } from '../../models/Exam';

interface Props {
  exam: Exam;
}

const pluralizeDays = (value: number) => {
  if (value === 1) {
    return 'день';
  }

  if (value > 1 && value < 5) {
    return 'дні';
  }

  return 'днів';
};

const renderDaysLeft = (value: number) => {
  if (value < 0) {
    return <strong>Завершено</strong>;
  }

  if (value === 0) {
    return <strong>Сьогодні</strong>;
  }

  return (
    <>
      <strong>
        {value} {pluralizeDays(value)}
      </strong>{' '}
      до початку
    </>
  );
};

const ExamSchedule = ({ exam }: Props) => {
  const { subject, lecturerName, room, daysLeft } = exam;

  const date = dayjs(exam.date);

  return (
    <CardWrapper $pastEvent={daysLeft < 0}>
      <Flex>
        <DividerRed />
        <CardMainData>
          <Subject>{subject}</Subject>
          <Teacher>
            <Pictogram src={clock} alt="time" />
            {date.format('h:mm A')}
          </Teacher>
          <Teacher>
            <Pictogram src={teacherIcon} alt="teacher" />
            {lecturerName}
          </Teacher>
          <Location>
            <Pictogram src={locationIcon} alt="location" />
            {room}
          </Location>
        </CardMainData>
      </Flex>
      <DateWrapper>
        <CardDate>
          <Year>{date.year()}</Year>
          <Date>{date.format('DD MMMM')}</Date>
          <DaysLeft>{renderDaysLeft(daysLeft)}</DaysLeft>
        </CardDate>
      </DateWrapper>
    </CardWrapper>
  );
};

export default ExamSchedule;

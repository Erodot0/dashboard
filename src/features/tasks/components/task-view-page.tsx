import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { TaskBoard } from './task-board';
import NewTaskDialog from './new-task-dialog';

export default function TaskViewPage() {
  return (
    <PageContainer>
      <div className='space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title={`Attività`} description='Gestisci le attivita' />
          <NewTaskDialog />
        </div>
        <TaskBoard />
      </div>
    </PageContainer>
  );
}

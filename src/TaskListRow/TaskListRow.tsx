import type { Task, TaskStatus } from '../Task/Task'
import { Tag } from '../Tag/Tag'
import { Avatar } from '../Avatar/Avatar'
import style from './TaskListRow.module.css'
import { getFormattedDate } from '../Utils/getFormattedDate'
import { getDueDateStatus } from '../Utils/getDueDateStatus'
import { pointEstimate, type PointEstimate } from '../Card/Card'
import { useState } from 'react'
import { useUpdateTask, useDeleteTask } from '../CustomHooks/useTasks'
import { useToast } from '../NotificationContext/NotificationContext'
import { ModalEditOptions } from '../ModalEditDelete/ModalEditDelete'
import { ModalEditTaskOptions } from '../ModalEditTask/ModalEditTask'
import { ModalConfirmationOptions } from '../ModalConfirmation/ModalConfirmation'

type TaskListRowProps = {
	task: Task
	index: number
}



export function TaskListRow({ task, index }: TaskListRowProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
	const updateTask = useUpdateTask()
	const confirmDeleteTask = useDeleteTask()
	const dueDateStatus = task.dueDate ? getDueDateStatus({ dateString: task.dueDate }) : null
	const { showToast } = useToast()
	const borderColor = dueDateStatus?.text ?? 'var(--color-neutral-3)'

	const handleEdit = () => {
		setIsFormOpen(true)
	}

	const handleDelete = () => {
		setIsConfirmationOpen(true)
	}

	const handleUpdateEstimate = (estimate: PointEstimate) => {
		handleUpdate({ pointEstimate: estimate })
	}

	const handleUpdateTag = (tags: typeof task.tags) => {
		handleUpdate({ tags: tags })
	}

	const handleUpdateDueDate = (dateString: string) => {
		handleUpdate({ dueDate: dateString })
	}

	const handleUpdateAssignee = (userId: string) => {
		handleUpdate({ assigneeId: userId })
	}

	const handleUpdateName = (name: string) => {
		handleUpdate({ name: name })
	}

	const handleUpdateStatus = (status: TaskStatus) => {
		handleUpdate({ status: status })
	}

	const handleUpdate = (partialInput: Partial<Omit<Task, 'id'>> & { assigneeId?: string }) => {
		updateTask.mutate(
			{ input: { id: task.id, ...partialInput } },
			{
				onSuccess: () => showToast('Operation Successful', 'success'),
				onError: () => showToast('Operation Failed', 'error'),
			}
		)
	}

	const handleConfirm = () => {
		confirmDeleteTask.mutate(
			{ input: { id: task.id } },
			{
				onSuccess: () => showToast('Operation Successful', 'success'),
				onError: () => showToast('Operation Failed', 'error'),
			}
		)
	}

	return (
		<div
			className={style.taskListRow}
			style={{ borderLeftColor: borderColor }}
		>
			{/* Task index and name cell */}
			<div className={style.taskCell} style={{ flex: '2' }}>
				<span className={style.taskIndex}>{String(index + 1).padStart(2, '0')}</span>
				<span className={style.taskName}>{task.name}</span>
			</div>

			{/* Tags cell */}
			<div className={style.taskCell} style={{ flex: '1.5' }}>
				<div className={style.tagsContainer}>
					{task.tags.length > 0 ? (
						task.tags.map((tag) => <Tag key={tag} tag={tag} />)
					) : (
						<span className={style.emptyCell}>—</span>
					)}
				</div>
			</div>

			{/* Estimate cell */}
			<div className={style.taskCell} style={{ flex: '0.8' }}>
				<span className={style.estimate}>{pointEstimate[task.pointEstimate]}</span>
			</div>

			{/* Assignee cell */}
			<div className={style.taskCell} style={{ flex: '1.2' }}>
				{task.assignee ? (
					<div className={style.assigneeContainer}>
						<Avatar
							avatar={task.assignee.avatar}
							fullName={task.assignee.fullName}
							size="sm"
							showName={true}
						/>
					</div>
				) : (
					<span className={style.emptyCell}>—</span>
				)}
			</div>

			{/* Due date cell */}
			<div
				className={style.taskCell}
				style={{ flex: '1', background: dueDateStatus?.background }}
			>
				{task.dueDate ? (
					<>
						{dueDateStatus && (
							<span className={style['sr-only']}>
								{dueDateStatus.status},
							</span>
						)}
						<span
							className={style.dueDate}
							style={{ color: dueDateStatus?.text }}
						>
							{getFormattedDate({ dateString: task.dueDate })}
						</span>
					</>
				) : (
					<span className={style.emptyCell}>—</span>
				)}
			</div>

			{/* Menu button cell */}
			<div className={style.taskCell} style={{ flex: '0.4' }}>
				<button
					className={style.moreButton}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-label="Task options"
					aria-haspopup="menu"
					aria-expanded={isMenuOpen}
				>
					<img src="cardIcons/more.svg" alt="" />
				</button>
			</div>

			{/* Modals */}
			{isMenuOpen && (
				<ModalEditOptions
					onEdit={handleEdit}
					onDelete={handleDelete}
					onClose={() => setIsMenuOpen(false)}
				/>
			)}

			{isFormOpen && (
				<ModalEditTaskOptions
					onEstimate={handleUpdateEstimate}
					onAssignee={handleUpdateAssignee}
					onTag={handleUpdateTag}
					onDueDate={handleUpdateDueDate}
					onName={handleUpdateName}
					onStatus={handleUpdateStatus}
					onClose={() => setIsFormOpen(false)}
					task={task}
				/>
			)}

			{isConfirmationOpen && (
				<ModalConfirmationOptions
					onConfirm={handleConfirm}
					onCancel={() => setIsConfirmationOpen(false)}
					onClose={() => setIsConfirmationOpen(false)}
				/>
			)}
		</div>
	)
}

import { Avatar } from "../Avatar/Avatar";
import { useQueryProfile } from "../CustomHooks/useUsers";
import style from './Settings.module.css';
import { getFormattedRegularDate } from "../Utils/getFormattedRegularDate";
export function Settings() {
    const { data: profile, isLoading, error } = useQueryProfile()

    return (
        <div className={style.container}>
            {isLoading ? (
                <p>Loading</p>
            ) : error ? (
                <p>Error loading this source</p>
            ) : (
                <>
                    <div className={style.avatarWrapper}>
                        <Avatar
                            avatar={profile.avatar}
                            fullName={profile.fullName}
                            size="lg"
                            showName={true}
                        />
                    </div>
                    <div className={style.wrapper}>

                        <div className={style.leftColumn}>

                            <div className={style.field}>
                                <span className={style.label}>Type</span>
                                <span className={style.value}>{profile.type}</span>
                            </div>
                            <div className={style.field}>
                                <span className={style.label}>Updated At</span>
                                <span className={style.value}>{getFormattedRegularDate(profile.updatedAt)}</span>
                            </div>
                        </div>

                        <div className={style.rightColumn}>
                            <div className={style.field}>
                                <span className={style.label}>Email</span>
                                <span className={style.value}>{profile.email}</span>
                            </div>
                            <div className={style.field}>
                                <span className={style.label}>Created At</span>
                                <span className={style.value}>{getFormattedRegularDate(profile.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
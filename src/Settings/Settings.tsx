import { Avatar } from "../Avatar/Avatar";
import { useQueryProfile } from "../CustomHooks/useUsers";
import style from './Settings.module.css';
import { getFormattedRegularDate } from "../Utils/getFormattedRegularDate";
export function Settings() {
    const { data: profile, isLoading, error } = useQueryProfile()


    if (isLoading) return <p>Loading</p>;
    if (error) return <p>Error loading this source</p>;
    if (!profile) return null;

    return (
        <div className={style.container}>

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
                            <span className={style.value}>{profile.updatedAt ? getFormattedRegularDate(profile.updatedAt) : null}</span>
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

        </div>
    )
}
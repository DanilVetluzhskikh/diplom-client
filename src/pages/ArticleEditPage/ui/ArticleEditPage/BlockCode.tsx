import { Input } from "@/shared/ui/redesigned/Input"
import { Text } from "@/shared/ui/redesigned/Text"
import { useTranslation } from "react-i18next"
import cls from './ArticleEditPage.module.scss'
import { Button } from "@/shared/ui/redesigned/Button";

interface BlockProps {
    code: string;
    setCode: (code: string) => void
    handleDeleteBlock: () => void
}

export const BlockCode = (props: BlockProps) => {
    const {code, setCode, handleDeleteBlock} = props
    const { t } = useTranslation();

    return (
        <div className={cls.blockItemText}>
            <Text className={cls.titleTextBlock} text={t('БЛОК КОДА')} size='l' />
            <textarea 
                className={cls.codeInput}
                placeholder={t('Код')} 
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <Button onClick={handleDeleteBlock} style={{marginTop: '15px'}}>{t('Удалить')}</Button>
        </div>
    )
}
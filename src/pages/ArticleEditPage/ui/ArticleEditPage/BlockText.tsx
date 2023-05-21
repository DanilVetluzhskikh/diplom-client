import { Input } from "@/shared/ui/redesigned/Input"
import { Text } from "@/shared/ui/redesigned/Text"
import { useTranslation } from "react-i18next"
import cls from './ArticleEditPage.module.scss'
import { useState } from "react";
import { Button } from "@/shared/ui/redesigned/Button";

interface BlockProps {
    title: string;
    paragraphs: string[];    
    setTitle: (title: string) => void
    setParagraphs: (parapraph: string[]) => void
    handleDeleteBlock: () => void
}

export const BlockText = (props: BlockProps) => {
    const {title, handleDeleteBlock, setTitle, setParagraphs} = props
    const { t } = useTranslation();

    const [paragraph, setParagraph] = useState('')
    
    return (
        <div className={cls.blockItemText}>
            <Text className={cls.titleTextBlock} text={t('БЛОК ТЕКСТА')} size='l' />
            <Input 
                placeholder={t('Заголовок блока')} 
                value={title}
                onChange={(value) => setTitle(value)}
            />
            <Input 
                className={cls.paragraphInput}
                placeholder={t('Параграфы, разделяйте знаком /n')} 
                value={paragraph}
                onChange={(value) => {
                    setParagraph(value)
                    setParagraphs(value.split('/n'))
                }}
            />
            <Button onClick={handleDeleteBlock} style={{marginTop: '15px'}}>{t('Удалить')}</Button>
        </div>
    )
}
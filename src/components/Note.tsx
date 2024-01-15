import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';

type NoteProps = {
    notation: string,
    canChangeNote?: boolean,
    onNotationChange?: (note: number) => void, 
}

export default function Note({ notation, onNotationChange, canChangeNote }: NoteProps) {

    let [note, setNote] = useState(notation);
    let stars = [1, 2, 3, 4, 5];

    function onNoteChanged(star: number) {
        if (canChangeNote) {
            setNote(star.toString());
            onNotationChange && onNotationChange(star);
        }
    }
    return (
        <>
            <Stack direction="horizontal" className='flex-wrap justify-content-center' gap={1}>
                {stars.map((star: number) => (
                    <div className='p-0' key={star}>
                        {star <= parseInt(note) ?
                            <StarFill role="button" onClick={() => { onNoteChanged(star); }} className='' style={{ color: 'var(--c-wishky)' }} />
                            :
                            <Star role="button" onClick={() => { onNoteChanged(star); }} style={{ color: 'var(--c-wishky)' }} />}
                    </div>
                ))}
            </Stack>
        </>
    )
}
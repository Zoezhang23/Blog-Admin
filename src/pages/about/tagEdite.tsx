import React, { useState, useEffect } from 'react';
import { Tag, Input, Message, } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

export const TagEdite = (props) => {
    const [tags, setTags] = useState(props.value || []);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const COLORS = [
        '#f53f3f',
        '#7816ff',
        '#00b42a',
        '#168cff',
        '#ff5722',
        '#165dff',
        '#ff7d00',
        '#eb0aa4',
        '#0fc6c2',
        '#ffb400',
        '#7bc616',
        '#f53f3f',
        '#7816ff',
        '#00b42a',
        '#86909c',
        '#b71de8',
        '#0fc6c2',
        '#ffb400',
        '#168cff',
        '#ff5722',
    ];




    useEffect(() => {
        setTags(props.value)
    }, [props.value])

    function addTag() {
        if (props.maxTags && tags?.length === props.maxTags) {
            setShowInput(false);
            Message.info(`Max tags are  ${props.maxTags} !`)
        } else {
            const index = tags.findIndex(tag => tag === inputValue)
            if (index > -1) {
                Message.info(`${inputValue} is existed.`)
            } else if (inputValue) {
                tags.push(inputValue);
                setTags(tags);
                setInputValue('');
                // onChange is passed in by Form.Item and will update the fields bound to the form when triggered.
                props.onChange && props.onChange(tags);
            }
            setShowInput(false);
        }

    }

    function removeTag(removeTag) {
        const newTags = tags.filter((tag) => tag !== removeTag);
        setTags(newTags);
        // onChange is passed in by Form.Item and will update the fields bound to the form when triggered.
        props.onChange && props.onChange(newTags);
    }

    return (
        <div style={{}}>
            {tags?.map((tag, index) => {
                return (
                    <Tag
                        key={tag}
                        closable={true}
                        onClose={() => removeTag(tag)}
                        color={COLORS[index]} bordered
                        style={{ marginRight: 24, marginBottom: 12 }}
                    >
                        {tag}
                    </Tag>
                );
            })}
            {showInput ? (
                <Input
                    autoFocus
                    size='mini'
                    value={inputValue}
                    style={{ width: 84 }}
                    onPressEnter={addTag}
                    onBlur={addTag}
                    onChange={setInputValue}
                />
            ) : (
                <Tag
                    icon={<IconPlus />}
                    style={{
                        width: 84,
                        backgroundColor: 'var(--color-fill-2)',
                        border: '1px dashed var(--color-fill-3)',
                        cursor: 'pointer',
                        marginRight: 24, marginBottom: 12
                    }}

                    onClick={() => setShowInput(true)}
                >
                    Add Tag
                </Tag>
            )}
        </div>
    );
}


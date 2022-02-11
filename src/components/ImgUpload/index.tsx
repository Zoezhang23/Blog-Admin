import { Message } from '@arco-design/web-react'
import React, { useEffect, useState } from 'react'
import { ImageItem } from './imageItem'

export const ImgUpload = (props) => {

    //get  props to child component.value is the data from DB
    const { onChange, value, maxImgs } = props;
    //use this template for each item
    interface Img {
        _id?: string,
        link?: string,
        url: string,
        icon?: string,
        showAddBtn?: boolean,
        showDelBtn?: boolean,
    }
    //give a inital value
    const initImgs: Array<Img> = [
        {
            _id: '',
            link: '',
            url: 'https://www.planetware.com/photos-large/F/france-things-to-do-eiffel-tower-sunset.jpg',
            icon: '',
            showAddBtn: false,
            showDelBtn: true,

        }
    ]
    const [imgs, setImgs] = useState(() => {
        return value ? value : initImgs
    })
    //decide true or false of child btn
    useEffect(() => {
        if (!value) return;
        if (imgs.length < maxImgs) {
            imgs.map((item, index) => {
                item.showDelBtn = imgs.length !== 1;
                item.showAddBtn = index === imgs.length - 1;
            })
        }
        setImgs(value);
        onChange(imgs);
    }, [value])
    // here to deal with the onChange function
    const onItemChange = (data) => {
        const { index, filed, value } = data
        imgs[index][filed] = value;
        onChange(imgs);
    }
    const addOne = () => {
        if (imgs.length < maxImgs) {
            imgs.push({
                _id: '',
                link: '',
                url: 'https://www.planetware.com/photos-large/F/france-things-to-do-eiffel-tower-sunset.jpg',
                icon: '',
                showAddBtn: false,
                showDelBtn: true,
            })
            onChange(imgs);
        } else {
            Message.info('The maximum image is 3 !')
        }
    }
    const deleteOne = (index) => {
        if (imgs.length > 0) {
            if (typeof index === 'number') {
                imgs.splice(index, 1)
                onChange(imgs);
            }
        }

    }
    //send props to child component
    return (
        imgs.map((item, index) => {
            return <ImageItem key={index} {...item
            } index={index} onChange={onItemChange} addOne={addOne} deleteOne={deleteOne}></ImageItem>
        })
    )
}

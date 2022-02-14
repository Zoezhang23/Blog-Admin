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
            url: '',
            icon: '',
            showAddBtn: true,
            showDelBtn: false,

        }
    ]
    const [imgs, setImgs] = useState(() => {
        return value ? value : initImgs
    })
    //decide true or false of child btn
    useEffect(() => {
        if (!value) return;

        imgs.map((item, index) => {
            if (imgs.length < maxImgs) {
                item.showDelBtn = imgs.length !== 1;
                item.showAddBtn = index === imgs.length - 1;
            } else {
                item.showDelBtn = true;
                item.showAddBtn = false;
            }
        })
        setImgs(imgs);
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
                url: '',
                icon: '',
                showAddBtn: true,
                showDelBtn: false,
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
            } index={index} onChange={onItemChange} addOne={addOne} deleteOne={deleteOne} showUpload showLink showIcon showOperation></ImageItem>
        })
    )
}

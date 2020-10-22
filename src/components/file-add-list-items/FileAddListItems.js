import React from 'react'

import FileAddItem from '../file-add-list-item/FileAddItem'

import './FileAddListItems.css'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';

export default function FileAddListItems({fileId, prevList}) {
  return (
    <section className='fileAddListItems'>
      <FileAddItem Icon={CheckCircleOutlineIcon} title="Leido" list='read' color='#51a351' fileId={fileId} prevList={prevList} />
      <FileAddItem Icon={QueryBuilderIcon} title="Pendiente" list='pending' color='#f89406' fileId={fileId} prevList={prevList} />
      <FileAddItem Icon={PlayCircleOutlineIcon} title="Siguiendo" list='following' color='#2f96b4' fileId={fileId} prevList={prevList} />
      <FileAddItem Icon={FavoriteBorderIcon} title="Favorito" list='favorite' color='#bd362f' fileId={fileId} prevList={prevList} />
      <FileAddItem Icon={CheckBoxOutlinedIcon} title="Lo tengo" list='obtained' color='#0e67ef' fileId={fileId} prevList={prevList} />
      <FileAddItem Icon={ThumbDownOutlinedIcon} title="Abandonado" list='abandoned' color='#970047' fileId={fileId} prevList={prevList} />
    </section>
  )
}

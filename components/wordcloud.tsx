import { TagCloud } from 'react-tagcloud'
import { Tooltip } from 'primereact/tooltip'

export default function WordCloud ({dataList}) {
    let dataArr = []
    for (let i in dataList) {
      dataArr = dataArr.concat(dataList[i])
    }

    const showData = groupBy(dataArr, (item)=>{
      return item.trad
    })

    const customRenderer = (tag, size, color) => {
      return (
        <span key={tag.value}>
          <span key={tag.value} style={{ color }} className={`tag-cloud-tag-${tag.value.replaceAll('(','').replaceAll(')','')}`} data-pr-tooltip={`${tag.value} (${tag.count})`}>
            {tag.value}{' '}
          </span>
          <style jsx>{`
            span .tag-cloud-tag-${tag.value.replaceAll('(','').replaceAll(')','')} {
              font-size: ${size}px;
              cursor: pointer;
            }
          `}</style>
          <Tooltip target={`.tag-cloud-tag-${tag.value.replaceAll('(','').replaceAll(')','')}`} mouseTrack mouseTrackLeft={10} style={{ maxWidth: '20rem' }} />
        </span>
      )
    }

  return  (
      <TagCloud minSize={12} maxSize={35} tags={showData} renderer={customRenderer}/>
  )
}

const groupBy = (array , f) => {
  const groups = {}
  array.forEach( (o) => {
      let group = f(o)
      groups[group] = groups[group] || []
      groups[group].push(o)
  })
  
  return Object.keys(groups).map(function (group) {
    return {value: group, count: groups[group].length}
  })
}
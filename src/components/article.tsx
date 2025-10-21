import {Card} from "primereact/card";

interface Props {
    article: IArticle
}

export default function Article(props: Props) {

    const header = props.article.image ? <figure
        className={'w-full aspect-video overflow-hidden'}
    >
        <img src={props.article.image}
             loading={'lazy'}
             className={'w-full aspect-video transition-all group-hover:scale-125 object-cover object-center'}
             alt={props.article.title}/>
    </figure> : null


    return <Card className="group card bg-base-100 shadow-sm"
                 header={header}
                 title={<p className={'text-lg line-clamp-2 font-bold'}>{props.article.title}</p>}
                 footer={<div className="flex justify-end">
                     <a href={props.article.url}
                        className="p-button"
                        target={'_blank'}>
                         Read
                     </a>
                 </div>}>
        <p className={'line-clamp-4'}>{props.article.content}</p>

    </Card>
}

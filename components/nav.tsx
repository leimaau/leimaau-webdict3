import { Menubar } from 'primereact/menubar'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Navbar() {

   const router = useRouter()

   const items = [
      {
          label: '基礎入門',
          icon: 'pi pi-fw pi-file',
          items: [
              {
                  label: '南寧白話拼音方案',
                  icon: 'pi pi-fw pi-align-left',
                  command:()=>{ router.push('/posts/PHONETICIZE') }
              },
              {
                  label: '南寧平話拼音方案',
                  icon: 'pi pi-fw pi-align-right',
                  command:()=>{ router.push('/posts/PHONETICIZE_bingwaa') }
              },
              {
                label: '與廣州話的區別',
                icon: 'pi pi-fw pi-align-center',
                command:()=>{ router.push('/posts/section2.2') }
              },
              {
                  separator: true
              },
              {
                  label: '參攷資料',
                  icon: 'pi pi-fw pi-tags',
                  command:()=>{ router.push('/posts/REFERENCES') }
              },
              {
                  label: '常見問題解答',
                  icon: 'pi pi-fw pi-tag',
                  command:()=>{ router.push('/posts/allbook') }
              }
          ]
      },
      {
          label: '常用工具',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {
                  label: '音標轉換',
                  icon: 'pi pi-fw pi-sync',
                  command:()=>{ router.push('/tools/jyutping_ipa') }
              },
              {
                  label: '在線標註',
                  icon: 'pi pi-fw pi-th-large',
                  command:()=>{ router.push('/tools/signarticle') }
              },
              {
                  label: '在線分詞',
                  icon: 'pi pi-fw pi-sitemap',
                  command:()=>{ router.push('/tools/segarticle') }
              },
              {
                  label: '讀音聯想',
                  icon: 'pi pi-fw pi-question',
                  command:()=>{ router.push('/tools/soundLenovo') }
              },
              {
                  label: '合音拆分',
                  icon: 'pi pi-fw pi-box',
                  command:()=>{ router.push('/tools/soundSplit') }
              },
              {
                  separator: true
              },
              {
                  label: '理論音推導',
                  icon: 'pi pi-fw pi-compass',
                  command:()=>{ router.push('/posts/infer') }
              },
              {
                  label: '南寧話輸入方案',
                  icon: 'pi pi-fw pi-user-edit',
                  command:()=>{ router.push('/posts/appendix4.2') }
              },

          ]
      },
      {
          label: '查詢',
          icon: 'pi pi-fw pi-search',
          items: [
              {
                  label: '單字查詢',
                  icon: 'pi pi-fw pi-chart-pie',
                  command:()=>{ router.push('/search') }
              },
              {
                  label: '詞彙查詢',
                  icon: 'pi pi-fw pi-book',
                  command:()=>{ router.push('/phrase') }
              },
              {
                  label: '語法查詢',
                  icon: 'pi pi-fw pi-briefcase',
                  command:()=>{ router.push('/grammar') }
              },
              {
                  label: '演化規律查詢(開發中)',
                  icon: 'pi pi-fw pi-chart-bar',
                  //command:()=>{ router.push('/evolution') }
              }
          ]
      },
      {
          label: '文檔',
          icon: 'pi pi-fw pi-folder',
          items: [
              {
                  label: '快速查詢手冊',
                  icon: 'pi pi-fw pi-list',
                  items:[
                    {
                       label:'Github庫',
                       icon:'pi pi-fw pi-github',
                       command:()=>{ window.open('https://github.com/leimaau/Nanning-Dialect-Manual') }
                    },
                    {
                       label:'在線預覽PDF',
                       icon:'pi pi-fw pi-download',
                       items:[
                        {
                            label:'南寧白話入門',
                            icon:'pi pi-fw pi-file-pdf',
                            command:()=>{ window.open('/pdf/?counter=0') }
                        },
                        {
                            separator: true
                        },
                        {
                            label:'南寧白話單字音表',
                            icon:'pi pi-fw pi-file-pdf',
                            command:()=>{ window.open('/pdf/?counter=1') }
                        },
                        {
                            label:'南寧白話同音字表',
                            icon:'pi pi-fw pi-file-pdf',
                            command:()=>{ window.open('/pdf/?counter=2') }
                        },
                        {
                            label:'南寧平話單字音表',
                            icon:'pi pi-fw pi-file-pdf',
                            command:()=>{ window.open('/pdf/?counter=3') }
                        },
                        {
                            label:'南寧平話同音字表',
                            icon:'pi pi-fw pi-file-pdf',
                            command:()=>{ window.open('/pdf/?counter=4') }
                        },
                        {
                            label:'南寧白話、南寧亭子平話與廣州話三語對照字表',
                            icon:'pi pi-fw pi-file-pdf',
                            command:()=>{ window.open('/pdf/?counter=5') }
                        },
                        /*{
                            label:'南寧話單字音文獻資料彙編（整理中）',
                            icon:'pi pi-fw pi-file-pdf',
                            //command:()=>{ window.open('/pdf/?counter=5') }
                        },*/
                       ]
                    }
                 ]
              },
              {
                  label: '快速查詢文章',
                  icon: 'pi pi-fw pi-calendar',
                  command:()=>{ router.push('/posts') }
              }
          ]
      },
      {
          label: '關於',
          icon: 'pi pi-fw pi-user',
          command:()=>{ router.push('/posts/about') }
      }
  ]

  const start = <a href="/"><Image alt="logo" src="/logo.png" onError={null} height={50} width={50} /></a>
  const end = <></>

  return (
        <div>
            <div className="card">
                <Menubar model={items} start={start} end={end} />
            </div>
        </div>
  )
}
  
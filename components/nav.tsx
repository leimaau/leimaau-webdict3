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
                  icon: 'pi pi-fw pi-align-justify',
                  command:()=>{ router.push('/posts/REFERENCES') }
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
                  icon: 'pi pi-fw pi-user-edit',
                  command:()=>{ router.push('/tools/signarticle') }
              },
              {
                  label: '理論音推導',
                  icon: 'pi pi-fw pi-sitemap',
                  command:()=>{ router.push('/posts/infer') }
              },
              {
                  label: '南寧話輸入方案',
                  icon: 'pi pi-fw pi-desktop',
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
                  icon: 'pi pi-fw pi-table',
                  command:()=>{ router.push('/') }
              },
              {
                  label: '詞彙查詢(開發中)',
                  icon: 'pi pi-fw pi-book',
              },
              {
                  label: '語法查詢(開發中)',
                  icon: 'pi pi-fw pi-briefcase',
              },
              {
                  label: '演化規律查詢(開發中)',
                  icon: 'pi pi-fw pi-chart-bar',

              }
          ]
      },
      {
          label: '文檔',
          icon: 'pi pi-fw pi-folder',
          items: [
              {
                  label: '快速查詢手冊',
                  icon: 'pi pi-fw pi-file-pdf',
                  command:()=>{ window.open('https://github.com/leimaau/Nanning-Dialect-Manual') }
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
  
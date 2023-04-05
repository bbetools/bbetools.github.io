const gen={
    head:{
        met:{
            list:[{name:'viewport',content:'width=device-width, initial-scale=1.0'},{charset:'UTF-8'}],
            exec:function(){
                let i,mlist=gen.head.met.list;
                mlen=mlist.length
                for(i=0;i<mlen;i++){
                    let current=mlist[i],meta=document.createElement('meta');
                    if(current.content)meta.content=current.content;
                    if(current.name)meta.name=current.name;
                    if(current.charset)meta.setAttribute('charset',current.charset);
                    document.head.appendChild(meta);
                }
            }
        },
        font:{
            list:[{font:'public sans',href:'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap'}],
            exec:function(){
                let i,flist=gen.head.font.list,flen=flist.length;
                for(i=0;i<flen;i++){
                    let f=flist[i],font=document.createElement('link');
                    if(f.href.includes('googleapis')){
                        font.rel='preconnect';
                        font.href='https://fonts.googleapis.com';
                        document.head.appendChild(font);
                        font=document.createElement('link');
                        font.rel='preconnect';
                        font.href='https://fonts.gstatic.com';
                        font.setAttribute('crossorigin','crossorigin');
                        document.head.appendChild(font);
                        font=document.createElement('link');
                    }
                    font.rel='stylesheet';
                    font.href=`${f.href}`;
                    document.head.appendChild(font);
                }
            }
        },
        style:{
            list:['main.css'],
            func:function(st){
                let style=document.createElement('link');
                style.rel='stylesheet';
                style.href=st;
                document.head.appendChild(style);
            },
            exec:function(addr,ext){
                const styleloc='/styles/';let i,stlist=(!addr)?gen.head.style.list:addr,stlen=stlist.length;
                if(!ext){for(i=0;i<stlen;i++){gen.head.style.func(`${styleloc}${stlist[i]}`);}}else{gen.head.style.func(addr);}
                gen.head.style.func(`${styleloc}${ptype}.css`);
            }
        },
        title:function(t){
            let h1;try{h1=document.getElementsByTagName('h1')[0]}catch(e){h1=0;}
            document.title=(ptype==='home')?'Home - Benny ESP GitHub Page':(h1)?`${h1.textContent} - Benny ESP GitHub Page`:`${t} - Benny ESP GitHub Page`;}
    },
    navlist:{top:[{name:'Home',link:'/'}],foot:[{name:'Kebijakan privasi',link:'/privacy-policy'},{name:'Syarat dan ketentuan',link:'/terms-of-use'}]},
    nav:function(n){
        let nav=document.createElement('nav'),nlist,nc,nlc;
        if(n==='footer'){
            let footr=document.createElement('footer');
            document.body.appendChild(footr);
            nlist=this.navlist.foot;
            nc='footer-nav',nlc='link-footer';
            footr.appendChild(nav);
        }else{
            nlist=this.navlist.top;
            nc='top-nav',nlc='topnav-link';
            document.body.insertAdjacentElement('afterbegin',nav);
        }
        nav.classList.add(nc);
        nlen=nlist.length;
        for(i=0;i<nlen;i++){
            let nlin=document.createElement('a');
            nlin.classList.add(nlc);
            nlin.href=nlist[i].link;
            nlin.textContent=nlist[i].name;
            nav.appendChild(nlin);
        }
    },
    postlist:function(){
        let target=document.getElementById('app-list');
        getjson('/data/post.json').then(
            function(dat){let i,pcount=dat.length;
                for(i=0;i<pcount;i++){
                    let post=dat[i],list=document.createElement('li'),plink=document.createElement('a');
                    plink.textContent=post.name;
                    plink.href=post.link;
                    target.appendChild(list);
                    list.appendChild(plink);
                }
            }
        );
    }
};
const getjson=async function(u){
    let res=await fetch(u);
    const dat=await res.json();
    return dat;
}

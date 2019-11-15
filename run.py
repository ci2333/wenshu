import execjs
import requests
import re

from lxml import etree
headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36'
}

with open('E:\js\demo5\ceshirun.js', 'r', encoding='UTF-8') as fp:
    js = fp.read()
    ctx1 = execjs.compile(js)



with open('E:\js\\test\wenshupage\\222.js', 'r', encoding='UTF-8') as fp:
    js = fp.read()
    ctx11 = execjs.compile(js)


url='http://wenshu.court.gov.cn/website/wenshu/181107ANFZ0BXSK4/index.html?docId=aace7b4903134427bea9aabf0123ea15'

html1=requests.get(url,headers=headers,allow_redirects=False)
print(html1.status_code)

print(html1.cookies)

print(html1.text)
HM4hUBT0dDOn80S=html1.cookies['HM4hUBT0dDOn80S']
rsqHtml = etree.HTML(html1.text)
meta = rsqHtml.xpath('/html/head/meta/@content')[1]
daima= rsqHtml.xpath('/html/head/script/text()')[0]

print(meta)
print(daima)

js11=ctx11.call('getcanshu',daima)
lis1t=[]
for a in js11:
    if type(js11[a]) !=list:
        lis1t.append(js11[a])

cookies=html1.cookies

key=str(lis1t[14])
ke2=lis1t[2]
ke3=lis1t[0]
ke4=lis1t[1]
ke5=str(lis1t[15])
ke6=str(lis1t[17])
ke7=str(lis1t[13])

print(key,ke2,ke3,ke4,ke5,ke6,ke7)
print(meta)
HM4hUBT0dDOn80T=ctx1.call('run',meta,key,ke2,ke3,ke4,ke5,ke6,ke7)

print(HM4hUBT0dDOn80T)
print(len(HM4hUBT0dDOn80T))

# cookies['HM4hUBT0dDOn80T']=str(HM4hUBT0dDOn80T)

headers1={
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cookie':'HM4hUBT0dDOn80S={}; HM4hUBT0dDOn80T={}'.format(str(HM4hUBT0dDOn80S),str(HM4hUBT0dDOn80T)),
    'Host': 'wenshu.court.gov.cn',
    'Proxy-Connection': 'keep-alive',
    'Referer': 'http://wenshu.court.gov.cn/website/wenshu/181107ANFZ0BXSK4/index.html?docId=aace7b4903134427bea9aabf0123ea15',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36'
}
#
# cookies = {
#     'HM4hUBT0dDOn80S': HM4hUBT0dDOn80S,
#     'HM4hUBT0dDOn80T': HM4hUBT0dDOn80T
# }

#
url1='http://wenshu.court.gov.cn/website/wenshu/181107ANFZ0BXSK4/index.html?docId=aace7b4903134427bea9aabf0123ea15'

html=requests.get(url1,headers=headers1)

print(html.status_code)
print(html.cookies)
# print(html.text)

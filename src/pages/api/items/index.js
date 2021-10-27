const { v4: uuid } = require('uuid');
import axios from 'axios';
import { formatProductArray } from '../../../utils/api';
export async function getData(params) {
  const {
    category,
    brand,
    condition,
    size,
    maxPrice = 50000,
    minPrice = 0,
    keyword,
    page,
    sort_by = 1,
    searchId = uuid(),
    limit,
  } = params;

  const { data } = await axios({
    method: 'get',
    url: 'https://www.mercari.com/v1/api',
    headers: {
      authority: 'www.mercari.com',
      'sec-ch-ua':
        '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
      'x-web-device-info':
        '{"augur":{"IDs":{"deviceID":"3M24Hd9HJ-EZsWvciZvIPqD8MieH-7keLblj","cookieID":"3M24Hd9BK8AZxzvjlo_hHKuYDw-p0e0XCqdr"},"version":"1.5.26","warpspeed":"truk","info":{"isSpoofed":false,"PM":false,"DNT":false,"deviceTimezone":-4,"extensionID":null,"externalID":null,"agent":{"family":"Chrome","major":"94","minor":"0","device":{"family":"Mac","major":"0","minor":"0"},"os":{"family":"Mac OS X","major":"10","minor":"14"}},"country":"United States","continent":"NA","inTwoTimezones":false,"proxy":false,"optOutNAI":false}},"iovation":"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;0400fJygH18RWyQpIfq2LLtL/VY+CUev3A4wEdk0XyLslOMCP3I/gtJSIOMr0YV5w5CL1CGixwJjc15TPYBPDpHYsPY1TOMPRs+jKFGZPzEsv6hvbtC1u0Gen4460Nj3vt4wjUq0Zh5oPV4O1bYJmYXZcsSby3e6L+XGhV60CV/T8GH0hG2CVDdNsf+4ApEKygaLol7lssJrOt3xVajijX/olKm4kOSdGzqj6neJEBOEWdpFbd0tYJjBlQpXv6faZswrQ87aH1q2ug4ihJ+ZBkvMGB4WTdj1wKPZ/pr71oD561q2xGAabwU/hMZdzJ08HjBJ8mXlgygynYNOfdJx+sF9hJgFSPiliZCXsUeuSsxN7kzxcBww1kKB5tfGjU8QBNb8P4TBuh74edovI05h3IJdYe9RJsn4u3PdHf7WUtiodkRj2icm57hh9z7daukkX8nXdQfOCFGssBBv47mN+mlXb4ZwpooAMcw6cpej/mBEkUX+ab/fxn6lzscAptVDtDKtmgU5QHGKPwSWlFrUvz/JA6HIE9bu4dgIjs036vlaixO/B8yMWlt1NpOzaZ+9tt9tJG+yX5TIGf2E6xZetSUu4kQMm7q/NCUaWMnwkS9sGlC34jutuljZ8meMAg6lIl7CWr62gc/9pqiCKkW7tG33TsQBi9ljkyKlBeiOThsX3U+Bt4Y79ZlleBsjiYQocFmAkdgirzCYAken/ZjN/sPWSL4WBkXxknQ8TUWvb0oFyUZlHVB6chrI7u8mR20/oWqfhp3GWZvlfT+LP/wT3etan3rjaIljE7wcLH/sQ/sXqk0yDUQkBm21+3hdrSzenwv2iK7pMCw9zdQzFtjtXQI6A+TQHjy7H5XhLHCHAGY3J0jpLqVrSVzsI1LB6M5fl2EoMEAoEitEttFUo1DRkUtPGGZXH7lFujsq608IMf1w8f6g5dRbGWPI8BYO/ZZ80vd9iQcp7l8EoPVZOWa7AmiMkYZc+cJURcFiYtBUbpa7l0GEKJ5sETroggSVcPSEQy29CXaiWs2BQ0+XtYyM6o2zOz/y5+gjrUg4Se0zAMBEe5WKRrn6YOiFer1/Y9e8eiB47caT1pbMLWpDjgwM7wDfYQalR6tq92sLbXR7w4autUYHyf83JPkBAkRaH4lVulA8gRgN+Z8HAFhGFzd/m6snVgtcnU5pFekiB8n/NyT5AQJEWh+JVbpQPIEYDfmfBwBYRhc3f5urJ1YLXJ1OaRXpIgfJ/zck+QECqJOz7YCWoR/CQai4/k8/K9DvxPQAaf/Xr5XHrcXp6A2ig+YdKzGIJBDAstLN4US59PE4fRZTRwz2ykV3stOnGIhVvv90tH9pagWmChPOd07jgOVOQ0qxy7yFkJIcYFQZBvPjheIx/95j3aE1Kav6TbwSyw9pfmqzNLFYvyARb3sSnjwNVGXSgGQ8InPsuf6/kpMgG84gzO5PMQF00uJew9XqxzJ4y+q4nCj5KIc/Jr1AzF/YRt4lPAexcHLdC9bjVIAW7uDQjXPJ5KZOY+8O2Z5lbKwbkY1WLiLEJ4zNTnn10bEWhlWOdjrHujrXYubGjXOee1yaDxckGfkEE1WWWgjUmRcgHrBGQMglJuIzm2CUwdC+vx8mmcScQ+v9NJ43zQWbHPUBjFhXgDUFdt1d6LNRN2mgrbbvQ/lDmbVdlYsAIM1lyxzD/7yhDwGqsacqrldgm35zacMolBxrqqJD4/EhQe0X/Vo2RQdSqpKnMmW+gBwXA5WAAEVfH5Uu1Pa6/vdLl0TuQFx53hPdt8o/ytvxHNZ3NkrhGk0Z9BtTQmV+HKtJvEDx/4CZ40cfr7DqdH1wm4xwVk6O3wxos8H6o9ZEbb2uS6wKnZYYJpd+OgIFHEHKDKKydRFPcf/PpF3GEoa32heS9VUNWdvh1XPtv5/lgEIMxVGtlppN6OdIAljxg/5egHUv5ljzeSOfQneOKHIFLhEFt0e84X/KbV0Mglv1p9nSZ9yAgtgJuysOHj1H/JuZ7X9tZWGsZDJ7UuqekPI/9Pi6g5AZBhQJRdMqnr3G5NYK/roIQYibpcaFaIdDpnKyVDxWgCIvIWVe008ePgILXZVPe0ppqvaTPiP1iDa7S/Np7IzgFP5+dJ4zz0SowlMLp29G1QfYaRO+xQJFjISuoVgKYrIZ8B5n+IRPxqWIaN25wLA9N64YMM1J8s5pKpeWRPL8pKrYaeCFRgju8u3gDrWhUeQkjULK++Jw/8qVoJ1luJCVU7TKmk8Avkg161QzxCNxLI0Biublo/csB8sa6dHhjhNjYs5V2padWYq0zwmFLw5MCAifJGfs6gPz4uvR+25oJwVoVRChN4dySTRqLYh1nT64WK8GuKXhCOr4AvmR9hDRvBi3oWy8l9u+Cmj1i2cwGzSyby6uOEIf0OZo0y25dgHpeBRAB2yI1fGhfKdxYpy8JCPEAJQ4O/7r2eDxD9a/pZOCg3Uz+2IpdI1b1r/3BC+A7uIP+lKFfrMSvE4Bz79UwYTAc4dtj0znx0WybvVwNcxHwtiwa2I8BoVoU+dhFeRnhsK+NH6QgAgap5stESNKItbbTQ8CxlYD9I5lRSgeV46nmPY6ehiuwvPGBPjgTCyUW3kD7hNvg3TiGIBwv90GvhYGRfGSdDzkQSMrzXndDtG6+QWjwp9Rh5M3Gt3RGOC15qqrOwEevGGoAEXqNlTFiuVJOUaNpzrh5gW0Ad2xjUOBaPIYb2HB+myXXy6jYC5yy+qYV0uv0uiv95kljY01IgX6+gLpubskXu+E9JXQ0hbN43d/GzKJ66hUpGP3wvX6YITkSjzm7ioXHfivF/f9o4SXB+lUnPuAdq16400tEXYpPgQiEVyiFhADfeGQZO1219Je5NRVefboT2Wl9J3REUCAAqfQFq+MsMdzyk02gHf2WBHuktR7ETOEEIsSejQD2u5WixRKP76mehTpa1IS3dNa4pXbRNVLOpGqtVclfOPAZXIY1m8dlsiDiVh1JglLowRmDA2PzivbuAQnKlVTiUoz+SnBI8ZHiqDr/DnINQ=="}',
      'x-csrf-token': 'CXHrdOCn-U5fNDi1-lJjE_1HX4JNOj1sSKaU',
      'sec-ch-ua-mobile': '?0',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
      'content-type': 'application/json',
      accept: '*/*',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      referer: 'https://www.mercari.com/search/?all_categories=1',
      'accept-language': 'en-US,en;q=0.9',
      cookie:
        '_gcl_au=1.1.85974333.1631240215; _fbp=fb.1.1631240215365.79999747; _pin_unauth=dWlkPVl6TXhObVkyWVRZdE5UQmxNeTAwTnprM0xXSmlOakl0TUdGak1qZGxZVEpsTURneQ; fp_token_7c6a6574-f011-4c9a-abdd-9894a102ccef=gELA+3pzLVnBt7yLXW+dzF5Px7OeoT2q0prVOMvBAkI=; _scid=72c9314d-69d5-4fe2-9cef-eac59ac6ed40; ab.storage.userId.10e16a16-356e-4541-bbc2-4440b8ba6c7a=%7B%22g%22%3A%22697599080%22%2C%22c%22%3A1631279007161%2C%22l%22%3A1631279007161%7D; ab.storage.deviceId.10e16a16-356e-4541-bbc2-4440b8ba6c7a=%7B%22g%22%3A%2253d628fd-fdee-7baf-d5ca-92f7a1367312%22%2C%22c%22%3A1631279007167%2C%22l%22%3A1631279007167%7D; __gads=ID=66069c9bbdddcd8c:T=1631279671:S=ALNI_Mb-Kie6WsN8_-KXVktiXWvqbzgP3Q; _gaexp=GAX1.2.N1ZGQvjuREaWNOHErsnlEA.18921.1; _ga_4NLR7T2LEN=GS1.1.1631279671.1.0.1631279693.0; _ga=GA1.2.173348201.1631240216; _mhcssid=eyJhY2Nlc3NUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUppSWpvaVpHTTJZVFUxTkdZek9XVTBZalE0TWpFMFpEZ3pORFF4TVRVNVpXSTVObUppWkRoaU9EUmxZMkV6TkRBME1EVmpNR0l6TXpNMU1XVTRaVFkyT1ROa1ptUXlaRE5pWmpka1pEUXhNR1ZtT1dNME5ESXpPV1V4TmpjMVl6ZG1PVFkxTkdSak56VTBORFkyWVdVM1ltRTFPRGhsTXpBelpHWTJNVGsyTXpFeU5HVTNZekUzTURJMU1URXdaREkyWkRCbE1UTmtOak16WldWaFlUZzBNR0ZsWTJGbVl6UTRaV1JqTUdabFltRmpOVGd5T0RFNE5XUmtZalV4T1dSaFpUaGlJaXdpWkdGMFlTSTZleUoxZFdsa0lqb2laMmc2ZHpwbE5tUXlZemt4TmkwMk5UZGhMVFEyWmpjdE9UQXpZUzAyTjJGbE5URTNaRFk0WlRVaUxDSjFjMlZ5U1dRaU9qWTVOelU1T1RBNE1Dd2lZV05qWlhOelZHOXJaVzRpT2lJeU9qRXdaRFZtTnpBMk5XVTNaakUzWkRWbU1ESXdaREV6TUdZMlpUQXdOamhsWTJObVltWmhNVE01TlRKallqQXdOV1F5TldGbVltUXlZekZrT0dWaU9UVWlmU3dpWlhod0lqb3hOak16T0RZNU1EQTFMQ0pwWVhRaU9qRTJNekV5Tnprd01EWjkuaS1UeUw2cV8tNmtZTnVxSEZobkVCbmNseUJpVXdWUGFvcHpXQ1NwUFNiWSIsInVzZXJJZCI6Njk3NTk5MDgwfQ==; _mhcssid.sig=pIjtOKb8aaaU7NRQZo7dJp0HOt0; merCtx=2; _MWUS=q9uelcef1vls15fg9q27dqkqsf; _mwus=eyJhY2Nlc3NUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUppSWpvaVpHTTJZVFUxTkdZek9XVTBZalE0TWpFMFpEZ3pORFF4TVRVNVpXSTVObUppWkRoaU9EUmxZMkV6TkRBME1EVmpNR0l6TXpNMU1XVTRaVFkyT1ROa1ptUXlaRE5pWmpka1pEUXhNR1ZtT1dNME5ESXpPV1V4TmpjMVl6ZG1PVFkxTkdSak56VTBORFkyWVdVM1ltRTFPRGhsTXpBelpHWTJNVGsyTXpFeU5HVTNZekUzTURJMU1URXdaREkyWkRCbE1UTmtOak16WldWaFlUZzBNR0ZsWTJGbVl6UTRaV1JqTUdabFltRmpOVGd5T0RFNE5XUmtZalV4T1dSaFpUaGlJaXdpWkdGMFlTSTZleUoxZFdsa0lqb2laMmc2ZHpwbE5tUXlZemt4TmkwMk5UZGhMVFEyWmpjdE9UQXpZUzAyTjJGbE5URTNaRFk0WlRVaUxDSjFjMlZ5U1dRaU9qWTVOelU1T1RBNE1Dd2lZV05qWlhOelZHOXJaVzRpT2lJeU9qRXdNMkV3T1RVeU1ESTBObUV5TW1KaU9ESmpaREZoWTJVMFltWTRNR0psT1RFeU1tUmpZVEUzWkRBd1pESTVObU15TW1FMU1UQXhNMkl5TjJVNE1XVWlmU3dpWlhod0lqb3hOak0yTlRjM09EWTVMQ0pwWVhRaU9qRTJNek01T0RZNE5qbDkuX0x1TXYwWmptMFpWNzcxMktsbU1OYXJXR1JRcWluOXJkUllwYktWX0tmNCIsInJlZnJlc2hUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUppSWpvaVpHTTJZVFUxTkdZek9XVTBZalE0TWpFMFpEZ3pORFF4TVRVNVpXSTVObUppWkRoaU9EUmxZMkV6TkRBME1EVmpNR0l6TXpNMU1XVTRaVFkyT1ROa1ptUXlaRE5pWmpka1pEUXhNR1ZtT1dNME5ESXpPV1V4TmpjMVl6ZG1PVFkxTkdSak56VTBORFkyWVdVM1ltRTFPRGhsTXpBelpHWTJNVGsyTXpFeU5HVTNZekUzTURJMU1URXdaREkyWkRCbE1UTmtOak16WldWaFlUZzBNR0ZsWTJGbVl6UTRaV1JqTUdabFltRmpOVGd5T0RFNE5XUmtZalV4T1dSaFpUaGlJaXdpWkdGMFlTSTZleUoxYzJWeVNXUWlPalk1TnpVNU9UQTRNQ3dpZFhWcFpDSTZJbWRvT25jNlpUWmtNbU01TVRZdE5qVTNZUzAwTm1ZM0xUa3dNMkV0TmpkaFpUVXhOMlEyT0dVMUluMHNJbWxoZENJNk1UWXpNems0TmpnMk9YMC42dXNPOFN4SjM3cGNNQ25KRzRqN1JhQVZTSVd4VW03VHNzS3duWVNhY3FJIiwib3B0aW1pemVFeHBlcmltZW50cyI6W3sidmFyaWFudCI6MCwiZXhwZXJpbWVudCI6IjB3b3FqS2lNUUE2NmRVOXczSFZYS1EiLCJuYW1lIjoicmVmZXJyYWwtY3RhLXRlc3QiLCJleHBpcmVkRGF0ZSI6MTYzOTAxNjIxMn0seyJ2YXJpYW50IjowLCJleHBlcmltZW50IjoiUUZzcWZxTVJULVNvN2pDYXhYd2tFZyIsIm5hbWUiOiJnZXRfdGhlX2FwcF9hZ2FpbnN0X3NlbGxfbm93IiwiZXhwaXJlZERhdGUiOjE2MzkwMTYyMTJ9LHsidmFyaWFudCI6MCwiZXhwZXJpbWVudCI6IkFxNWhDSlVHU2tLdDNId2JuYlpQRFEiLCJuYW1lIjoiZnJlZV9zaGlwcGluZ190aHVtYiIsImV4cGlyZWREYXRlIjoxNjM5MDE2MjEyfSx7InZhcmlhbnQiOjAsImV4cGVyaW1lbnQiOiJyRHdNRV9fZVEwLWp5SjA3cUJaVkV3IiwibmFtZSI6InBheXBhbF9jcmVkaXQiLCJleHBpcmVkRGF0ZSI6MTYzOTAxNjIxMn0seyJ2YXJpYW50IjozLCJleHBlcmltZW50IjoidXBrMG1DVkJRek92MWlyTEdBSnNtQSIsIm5hbWUiOiJ3ZWItdG8tYXBwLTIwMjEiLCJleHBpcmVkRGF0ZSI6MTYzOTAxNjIxMn0seyJ2YXJpYW50IjoxLCJleHBlcmltZW50IjoicU1raF9UUWRTeU80aHZ4eHJ2WVNaQSIsIm5hbWUiOiJ3ZWItaG9tZS1tYXJrZXRpbmctdGVzdCIsImV4cGlyZWREYXRlIjoxNjQwNTcxNDg0fV0sImNzcmZTZWNyZXQiOiJrVDFSemJ6VFpPWVpJYU9xRkdLY1l2ZHUiLCJ1c2VySWQiOjY5NzU5OTA4MCwibGFzdEF1dGhlbnRpY2F0ZWRBdCI6IjE2MzEyNzkwMDcifQ==; _mwus.sig=UzjGMKmjAPyCWadtY5dmYU4EIPI; _gid=GA1.2.134888949.1634484732; _sctr=1|1634529600000; __idcontext=eyJjb29raWVJRCI6IkVJRFlTRTNBRzJJWlQzVElJUFdNWVVFTldaMldONzZYSEZSM1FYSEpVQ1lRPT09PSIsImRldmljZUlEIjoiRUlEWVNFM0FHQ08zUjNRNkNQSjVHUkZFU1I3QUZRWDdDNUU2WVZPT1gyNFE9PT09IiwiaXYiOiJaQllQV0ZNVk9LRUhZRVNOSDNMTVdSVFZSST09PT09PSIsInYiOjF9; ab.storage.sessionId.10e16a16-356e-4541-bbc2-4440b8ba6c7a=%7B%22g%22%3A%22224b6115-e5fd-137a-cd87-a21404f55459%22%2C%22e%22%3A1634706985513%2C%22c%22%3A1634701833553%2C%22l%22%3A1634705185513%7D; _gat_UA-50190241-3=1; _uetsid=662324002f5f11ec9c61e580e05c4ea4; _uetvid=2b6b87e011dd11eca77e23b503aa3bd8; _tq_id.TV-09905490-1.9847=52e6602f72a43fac.1631240215.0.1634705235..; _mwus=eyJhY2Nlc3NUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUppSWpvaVpURm1NMkk1WmpVNU56VmlOak01T0RRMU0yTTFZekE1WldFd09XRXpNaklpTENKa1lYUmhJanA3SW5WMWFXUWlPaUpuYURwM09tWTJNREUxWVdZNUxXVTRNR0V0TkRabU9DMWlNV1JqTFdZeE5XTTRNbUUzTTJZNU1TSXNJbUZqWTJWemMxUnZhMlZ1SWpvaVdscElXV2RHWjBSUmFtcEFNM0EwVEZkb1FGRldUV0V5WmlGWk9FMDJVRmc0TGxwcWFuWlFVR00zYlV4cVVFNUdURjlYUzNOb0luMHNJbVY0Y0NJNk1UWXpORE14TmpJMU5pd2lhV0YwSWpveE5qTXpOekV4TkRVMmZRLkVLNVFHRkZuai00ODMzT1ZCOXIxM0liNlhyUTBHbm1RRnRGQXBBelpROG8iLCJyZWZyZXNoVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaUlqb2laVEZtTTJJNVpqVTVOelZpTmpNNU9EUTFNMk0xWXpBNVpXRXdPV0V6TWpJaUxDSmtZWFJoSWpwN0luVjFhV1FpT2lKbmFEcDNPbVkyTURFMVlXWTVMV1U0TUdFdE5EWm1PQzFpTVdSakxXWXhOV000TW1FM00yWTVNU0o5TENKcFlYUWlPakUyTXpNM01URTBOVFo5LnhBOVVCb3c1ZE91YnJMVmZ2YVhhU1ZYVm9qalpwY3NtQldDRGk0Vm9vdGciLCJvcHRpbWl6ZUV4cGVyaW1lbnRzIjpbeyJ2YXJpYW50IjoxLCJleHBlcmltZW50IjoiMHdvcWpLaU1RQTY2ZFU5dzNIVlhLUSIsIm5hbWUiOiJyZWZlcnJhbC1jdGEtdGVzdCIsImV4cGlyZWREYXRlIjoxNjM5MDYzMzExfSx7InZhcmlhbnQiOjAsImV4cGVyaW1lbnQiOiJRRnNxZnFNUlQtU283akNheFh3a0VnIiwibmFtZSI6ImdldF90aGVfYXBwX2FnYWluc3Rfc2VsbF9ub3ciLCJleHBpcmVkRGF0ZSI6MTYzOTA2MzMxMX0seyJ2YXJpYW50IjowLCJleHBlcmltZW50IjoiQXE1aENKVUdTa0t0M0h3Ym5iWlBEUSIsIm5hbWUiOiJmcmVlX3NoaXBwaW5nX3RodW1iIiwiZXhwaXJlZERhdGUiOjE2MzkwNjMzMTF9LHsidmFyaWFudCI6MCwiZXhwZXJpbWVudCI6InJEd01FX19lUTAtanlKMDdxQlpWRXciLCJuYW1lIjoicGF5cGFsX2NyZWRpdCIsImV4cGlyZWREYXRlIjoxNjM5MDYzMzExfSx7InZhcmlhbnQiOjIsImV4cGVyaW1lbnQiOiJ1cGswbUNWQlF6T3YxaXJMR0FKc21BIiwibmFtZSI6IndlYi10by1hcHAtMjAyMSIsImV4cGlyZWREYXRlIjoxNjM5MDYzMzExfSx7InZhcmlhbnQiOjAsImV4cGVyaW1lbnQiOiJxTWtoX1RRZFN5TzRodnh4cnZZU1pBIiwibmFtZSI6IndlYi1ob21lLW1hcmtldGluZy10ZXN0IiwiZXhwaXJlZERhdGUiOjE2NDA2NTg2MjN9XSwiY3NyZlNlY3JldCI6IlhvcFBPdi1XaC12RHpRYnFHUDl1QUNqQyJ9; _mwus.sig=DZ3guvq7v7w3g1GjgLRzHCBfUzg; merCtx=2',
    },
    params: {
      operationName: 'searchFacetQuery',
      variables: {
        criteria: {
          offset: +page * (+limit || 60),
          query: keyword,
          soldItemsOffset: 0,
          promotedItemsOffset: +page * (+limit || 60),
          sortBy: +sort_by,
          length: +limit || 60,
          facets: [1, 2, 3, 5, 7, 8, 9, 10, 11, 13],
          categoryIds: category ? [+category] : undefined,
          itemConditions: condition?.split(',')?.map((c) => +c) || [],
          brandIds: brand?.split(',')?.map((b) => +b) || [],
          sizeIds: size?.split(',')?.map((s) => +s) || [],
          deliveryType: 'all',
          maxPrice: +maxPrice,
          minPrice: +minPrice,
          searchId,
        },
        categoryId: 0,
      },
      extensions: {
        persistedQuery: {
          version: 1,
          sha256Hash:
            '2f100311be0b262346bd5775c095c06040ed83fd0849cd2af0dfbcc24f3d016d',
        },
      },
    },
  });
  const { itemsList, count } = data.data.search;
  return {
    count,
    itemsList: formatProductArray(itemsList),
    pagination: { currentPage: +page, nextPage: +page + 1, searchId },
  };
}
export default async function handler(req, res) {
  const jsonData = await getData(req.query);
  res.send(jsonData);
}

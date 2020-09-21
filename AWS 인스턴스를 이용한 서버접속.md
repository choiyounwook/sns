# AWS 인스턴스를 이용한 서버접속

1. 제공되는 서버 : `AWS EC2`

- 서버명(DNS): i3팀ID.p.ssafy.io (예: 서울1반 1조 - i3a101.p.ssafy.io)
- 인증키: I3팀IDT.pem (예: 서울1반 1조 - I3A101T.pem)
- 접속 방법리눅스 또는 GIt Bash 등: ssh -i PEM파일명 ubuntu@서버명 (예: 서울1반 1조의 경우, ssh -i I3A101T.pem [ubuntu@i3a101.p.ssafy.io](mailto:ubuntu@i3a101.p.ssafy.io)) putty 이용 시, puttygen으로 pem파일을 ppk로 변환하여 ubuntu@서버명(22번 포트)으로 접속

> 서울 1반 8조의 경우 : git bash >>  `ssh -i I3A508T.pem ubuntu@i3a508.p.ssafy.io` 




import { useState } from "react";

function App() {
    const [value, setValue] = useState("");
    //타입스크립트는 이 onChange 함수가 InputElement에 의해서 실행될 것을 안다
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        //event.currentTarget.value
        const {
            currentTarget: { value },
        } = event;

        setValue(event.currentTarget.value);
    }; //React.FormEvent는 공식 문서를 가야 알 수 있음

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("제출", value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder="사용자이름"
                />
                <button>로그인</button>
            </form>
        </div>
    );
}

export default App;

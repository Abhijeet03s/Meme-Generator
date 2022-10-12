import * as htmlToImage from 'html-to-image';

export default function DownloadBtn(e) {
    function download() {
        htmlToImage
            .toPng(document.querySelector('.meme'), { quality: 1 })
            .then(function (data) {
                // console.log(data);
                let link = document.createElement('a');
                link.download = 'meme.png';
                link.href = data;
                link.click();
            });
    }

    return (
        <button
            className="download-button"
            onClick={download}
        >
            Download Meme
        </button>
    );
}
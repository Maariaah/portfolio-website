//loader

if ($('#svg_square2').length) {
    let loading = 0;
    let loadingInterval = setInterval(Loader, 20);

    function Loader() {

        let path = $('#svg_square2');


        let pathLength = path.getTotalLength();
        console.log(pathLength);
        path.style.strokeDasharray = pathLength + ' ' + pathLength;
        path.style.strokeDashoffset = pathLength;
        function loaded2() {
            $('.loading').fadeOut();
        }

        if (loading === 100) {
            clearInterval(loadingInterval);
            loaded2();
        }
        else {
            loading += 1;
        }
    }
}
import React from 'react'

type Props = {
    description: string
}
const ProductDescription = ({ description }: Props) => {
    return (
        <div className='text-sm'>{description}</div>
        // <div className='text-sm'>
        //     <p>
        //         &#55357;&#56469; Ch&agrave;o m&#7915;ng &#273;&#7871;n v&#7899;i c&#7917;a h&agrave;ng c&#7911;a
        //         ch&uacute;ng t&ocirc;i &#55356;&#57239;
        //     </p>

        //     <p>
        //         &#55357;&#56469; K&iacute;ch th&#432;&#7899;c chi ti&#7871;t &#273;&#432;&#7907;c hi&#7875;n th&#7883;
        //         b&ecirc;n d&#432;&#7899;i . H&atilde;y &#273;&#7885;c ch&uacute;ng m&#7897;t c&aacute;ch c&#7849;n
        //         th&#7853;n .
        //     </p>

        //     <p>
        //         &#55357;&#56469; S&#7843;n ph&#7849;m n&agrave;y c&oacute; trong kho v&agrave; c&oacute; th&#7875;
        //         &#273;&#432;&#7907;c giao cho b&#7841;n s&#7899;m nh&#7845;t .
        //     </p>

        //     <p>
        //         &#55357;&#56460; N&#7871;u b&#7841;n c&oacute; b&#7845;t k&#7923; c&acirc;u h&#7887;i n&agrave;o
        //         v&#7873; vi&#7879;c mua h&agrave;ng c&#7911;a m&igrave;nh. xin vui l&ograve;ng li&ecirc;n h&#7879;
        //         v&#7899;i ch&uacute;ng t&ocirc;i v&agrave; ch&uacute;ng t&ocirc;i s&#7869; tr&#7843; l&#7901;i d&#7921;a
        //         tr&ecirc;n s&#7921; h&agrave;i l&ograve;ng c&#7911;a b&#7841;n .
        //     </p>

        //     <p>&#9989; S&#7843;n ph&#7849;m c&#7911;a ch&uacute;ng t&ocirc;i l&agrave; 100'm&#7899;i .</p>

        //     <p>
        //         &#9989; T&ocirc;i hy v&#7885;ng s&#7869; mang l&#7841;i cho b&#7841;n tr&#7843;i nghi&#7879;m mua
        //         s&#7855;m t&#7889;t nh&#7845;t .
        //     </p>

        //     <p>
        //         &#55357;&#56633;&#55357;&#56632;&#55357;&#56633;&#55357;&#56632;&#55357;&#56633;&#55357;&#56632;&#55357;&#56633;&#55357;&#56632;&#55357;&#56633;&#55357;&#56632;&#55357;&#56633;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56633;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56633;&#55357;&#56632;
        //     </p>

        //     <p>Lo&#7841;i s&#7843;n ph&#7849;m gi&agrave;y th&#7875; thao</p>

        //     <p>Phong c&aacute;ch ' Gi&#7843;n d&#7883;</p>

        //     <p>Phong c&aacute;ch ' Gi&#7843;n d&#7883;</p>

        //     <p>Ch&#7845;t li&#7879;u gi&agrave;y | PU</p>

        //     <p>Ch&#7845;t li&#7879;u s&agrave;n - cao su</p>

        //     <p>M&agrave;u &#273;en , xanh l&aacute; c&acirc;y</p>

        //     <p>Ch&acirc;n '&#272;&#7847;u tr&ograve;n</p>

        //     <p>Ch&#7913;c n&#259;ng &quot; Ch&#7889;ng tr&#432;&#7907;t v&agrave; tho&#7843;i m&aacute;i</p>

        //     <p>Ch&acirc;n '&#272;&#7847;u tr&ograve;n</p>

        //     <p>
        //         &#55357;&#56633;&#55357;&#56632;&#55357;&#56633;&#55357;&#56632;&#55357;&#56633;&#55357;&#56632;&#55357;&#56633;&#55357;&#56632;&#55357;&#56633;&#55357;&#56632;&#55357;&#56633;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56633;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56632;&#55357;&#56633;&#55357;&#56632;
        //     </p>

        //     <p>&#9989; Ch&#7913;c n&#259;ng &quot; Ch&#7889;ng tr&#432;&#7907;t v&agrave; tho&#7843;i m&aacute;i</p>

        //     <p>&#9989; Th&#7901;i gian s&#7917; d&#7909;ng &quot; M&#7895;i ng&agrave;y</p>

        //     <p>
        //         &#9989; Ch&uacute;ng t&ocirc;i c&oacute; nhi&#7873;u kinh nghi&#7879;m v&agrave; s&#7843;n ph&#7849;m
        //         ch&#7845;t l&#432;&#7907;ng cao . Ch&uacute;ng t&ocirc;i t&#7853;p trung v&agrave;o c&aacute;c s&#7843;n
        //         ph&#7849;m ch&#7845;t l&#432;&#7907;ng cao v&agrave; gi&aacute; th&agrave;nh r&#7867; '
        //     </p>

        //     <p>
        //         &#55357;&#56469; Lu&ocirc;n c&oacute; s&#7843;n ph&#7849;m m&#7899;i . Vui l&ograve;ng theo d&otilde;i
        //         c&aacute;c b&#7843;n c&#7853;p nh&#7853;t m&#7899;i nh&#7845;t c&#7911;a ch&uacute;ng t&ocirc;i .
        //     </p>

        //     <p>
        //         &#55356;&#57211; N&#7871;u b&#7841;n th&iacute;ch s&#7843;n ph&#7849;m c&#7911;a ch&uacute;ng t&ocirc;i
        //         , vui l&ograve;ng th&ecirc;m n&oacute; v&agrave;o gi&#7887; h&agrave;ng c&#7911;a b&#7841;n .
        //     </p>

        //     <p>
        //         C&#7843;m &#417;n b&#7841;n Ch&uacute;ng t&ocirc;i mong &#273;&#7907;i x&#7871;p h&#7841;ng n&#259;m sao
        //         c&#7911;a b&#7841;n . &#65288;^___^&#65289;
        //     </p>
        // </div>
    )
}

export default ProductDescription

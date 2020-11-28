import React from 'react'
import styled from "styled-components"
import {Pagination} from "semantic-ui-react";
import {Container} from "@material-ui/core"
const Div = styled.div`
padding:60px 0;
h2{
text-align:center;
margin:10px 0 20px 0;
}
.grid{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
}
`
const MostDownloadMedia = ({post,pageNo,totalPage,handlePageChange}) => {
    return (
        <Div>
            <Container>
                <h2>Most Downloaded Media</h2>
                <div className="grid">
                {post}
                </div>
                <Pagination
                boundaryRange={0}
                    defaultActivePage={pageNo}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                    totalPages={totalPage}
                    style={{margin:"40px auto",display: 'flex',
                    width:' min-content',marginBottom:0}}
                    onPageChange={handlePageChange}
                />
            </Container>
        </Div>
    )
}

export default MostDownloadMedia

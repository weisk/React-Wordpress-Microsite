import React, {Component} from 'react';
import {connect} from 'react-redux';
import HookStore from '@Core/HookStore';
import PostCard from '@Components/PostCard';
import ErrorBoundary from '@Core/ErrorBoundary';
import Grid from '@material-ui/core/Grid';
import {getPosts} from '@Actions';

class Siderail extends Component{
    posts = () => {
        let _posts = [];
        let {api} = this.props;
        for(let i = 0; i < api.posts.length; i++){
            let p = api.posts[i];
            _posts.push(
                <Grid item xs={12} sm={6} md={3} lg={12} key={p.id}>
                    <PostCard
                        id={p.id}
                        img={p.featured_image}
                        date={p.modified}
                        slug={p.slug}
                        title={p.title.rendered}
                        author={p.metadata.display_aname[0]}
                    />
                </Grid>
            );
        }
        return _posts;
    }

    componentDidMount(){
        HookStore.addFilter('the_post', 'Siderail', (post) => {
            this.props.getPosts(`&exclude=${post.id}&per_page=4`);
            return post;
        }, 99999);
    }

    render(){
        return(
            <ErrorBoundary errorContent={null}>
                <Grid item xs={12} lg={3} key="siderail" id="siderail">
                    <h3>Recommended</h3>
                    <Grid container spacing={3}>{this.posts()}</Grid>
                </Grid>
            </ErrorBoundary>
        );
    }
}

const mapStateToProps = (state) => ({ api: state.api });

export default connect(mapStateToProps, {getPosts})(Siderail);

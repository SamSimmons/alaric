import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { setProfileTag } from '../actions'

const Profile = (props) => {

  const { name, total, tags, selectedTag, selectProfileTag } = props;

  return (
    <div className="profile">
      <div className="sub-head">{name} — {total} clips</div>
      <Select
        value={selectedTag}
        options={tags}
        onChange={({ value }) => {
          selectProfileTag(value)
        }}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    tags: state.filters.tags.map(({ name }) => ({ value: name, label: name })),
    selectedTag: state.profile.selectedTag,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectProfileTag: (tag) => dispatch(setProfileTag(tag)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

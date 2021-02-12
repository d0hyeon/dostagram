<script type="ts">
  import { onMount } from 'svelte';
  import UserThumbnail from '~components/common/UserThumbnail.svelte';
  
  import firebase from 'src/utils/firebase';
  import type {User} from 'src/@types/User';
  import {addUser, userState, userMapState} from 'src/stores/user';

  let searchResults: User[] = [];
  let collection;
  let autoCompleteCurrentIdx = 0;
  let promises = [];
  let isLoading: boolean = false;

  onMount(() => {
    const db = firebase.firestore();
    collection = db.collection('user');
    const authCompleteEl = document.querySelector('.auth-complete');
    const handleAutoCompleteOuterClick = (event) => {
      if(! (authCompleteEl.contains(event.target as HTMLElement) || authCompleteEl === event.target)) {
        searchResults = [];
      }
    }
    const handleAutoCompleteKeyDown = (event) => {
      if(searchResults.length) {
        if(event.key === 'ArrowDown' && autoCompleteCurrentIdx < searchResults.length-1) {
          autoCompleteCurrentIdx += 1;
        } else if(event.key === 'ArrowUp' && 0 < autoCompleteCurrentIdx) {
          autoCompleteCurrentIdx -= 1;
        }   
      }
    } 
    document.addEventListener('click', handleAutoCompleteOuterClick);
    document.addEventListener('keydown', handleAutoCompleteKeyDown);

    return () => {
      document.removeEventListener('click', handleAutoCompleteOuterClick);
      document.removeEventListener('keydown', handleAutoCompleteKeyDown);
    }
  });

 
  const handleSearchKeyUp = (event) => {
    const value = event.target.value;
    if(value) {
      isLoading = true;
      collection.where('username', '==', value).get()
        .then(querySnapshot => {
          searchResults = [];
          
          const storeUsers: User[] = Object.values($userMapState).filter(({username}) => {
            if(username.replace('_', '').indexOf(value) > -1) {
              return true;
            } 
            return false;
          });

          searchResults = storeUsers;

          if(!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              const user = doc.data();
              if(!$userState[user.uid]) {
                userState.update(prev => ([
                  ...prev,
                  user
                ]));
                addUser(user);
              }
              if(searchResults.every(({uid}) => {
                if(uid === user.uid) {
                  return false;
                }
                return true;
              })) {
                searchResults = [
                  ...searchResults,
                  user
                ]
              }
            });
          }
          isLoading = false;
        })
    } else {
      searchResults = [];
    }
  }
</script>

<div class="search">
  <div class="auth-complete">
    <label>
      <input type="text" on:keyup={handleSearchKeyUp} placeholder="검색" />
      {#if isLoading}
        <i>
          <img src="images/icon/loading.gif" alt="로딩중.." />
        </i>
      {/if}
    </label>
    
    {#if searchResults.length > 0}
      <div class="list">
        <span class="icon-arrow" />
        <ul>
          {#each searchResults as {username, name, thumbnail}, idx}
          <li class:active={autoCompleteCurrentIdx === idx}>
            <div class="thumbnail">
              <UserThumbnail username={username} filename={thumbnail} size={44} />
            </div>
            <div class="info">
              <p>
                <strong>{username}</strong>
              </p>
              <p>{name}</p>
            </div>
          </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">  
.auth-complete {
    position: relative;
    label {
      position: relative;

      i {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        
        img {
          width: 20px;
        }
      }
    }
    input {
      width: 100%;
      height: 30px;
      padding: 0 10px;
      border: 1px solid var(--border-color);
      background-color: var(--background-color);
    }

    .list {
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translate(-50%, 10px);
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
      .icon-arrow {
        position: absolute;
        left: 50%;
        top: 0px;
        width: 14px;
        height: 14px;
        transform:translate(-50%, -50%) rotate(45deg);
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
        z-index: -1;
      }
      ul {
        position: relative;
        background-color: #fff;
        padding: 12px 0;

        li {
          width: 300px;
          display: flex;
          padding: 8px 16px;
          align-items: center;
          cursor: pointer;

          &:hover,
          &.active {
            background-color: var(--background-color);
          }

          .thumbnail {
            flex: 0 0 44px;
            margin-right: 12px;
          }
          .info {
            flex: 0 0 auto;
            width: 100%;

            strong {
              font-weight: bold;
            }
          }

          p ~ p {
            margin-top: 8px;
          }
        }
      }
    }
  }
</style>
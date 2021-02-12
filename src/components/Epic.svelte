<script type="ts">
  
  import {onMount} from 'svelte';

  import firebase from 'src/utils/firebase';
  import { accessState } from 'src/stores/access';
  import { userState, userMapState } from 'src/stores/user';
  
  onMount(() => {
    const unsubscribeAccess = accessState.subscribe(access => {
      const db = firebase.firestore();
      db.collection('user').where('uid', '==', access).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const user = doc.data();
            if(user) {
              userState.update(prev => ([
                ...prev,
                user.id
              ]));
              userMapState.update(prev => ({
                ...prev,
                [user.uid]: user
              }))
            }
          })
        })
    });

    return () => {
      unsubscribeAccess();
    }
  })
  
</script>
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dto';
import { FirebaseAppRepository } from 'src/firebase/firebase-app.repository';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(private firebaseAppRepository: FirebaseAppRepository) {}

  createUser(user: UserDto) {
    /*
      in case you want to change collection to therapists ya "Nesma":

      this.firebaseAppRepository.collection = this.firebaseAppRepository.db.collection('therapists')
    */
    try {
      const userCreated = this.firebaseAppRepository.db
        .collection('users')
        .add(user);
      return { Message: 'User created successfully', User: user };
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    const usersRef = this.firebaseAppRepository.collection;
    const snapshot = await usersRef.get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return { Message: 'No matching documents.' };
    } else {
      const allDocs = [];
      snapshot.forEach((doc) => {
        const { ...docData } = doc.data();
        console.log(`Document ID: ${doc.id}`);
        console.log(`Document Data:`);
        console.log(docData);
        console.log('---------------------------');
        allDocs.push({ docID: doc.id, docData });
      });
      return allDocs;
    }
  }

  async viewInfo(firebaseUID: string) {
    const query = this.firebaseAppRepository.collection.where(
      'firebase_uid',
      '==',
      firebaseUID,
    );
    const querySnapshot = await query.get();
    const documents = querySnapshot.docs.map((doc) => doc.data());
    return documents[0];
  }

  async editInfo(data: UserDto) {
    const query = this.firebaseAppRepository.collection.where(
      'firebase_uid',
      '==',
      data.firebase_uid,
    );
    const querySnapshot = await query.get();
    const documents = querySnapshot.docs.map((doc) => doc.id);
    const documentId = documents[0];
    const docRef = this.firebaseAppRepository.db
      .collection('users')
      .doc(documentId);

    const excludedFields = ['firebase_uid', 'role'];

    const userData = Object.fromEntries(
      Object.entries(data).filter(([key]) => !excludedFields.includes(key)),
    );

    console.log('userData: ', userData);

    try {
      await docRef.update(userData);
      console.log('Document updated successfully!');
      return { Message: 'Document updated successfully!' };
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }
  async deleteUser(data: { firebase_uid: string }) {
    console.log('firebaseUID: ', data.firebase_uid);
    const query = this.firebaseAppRepository.collection.where(
      'firebase_uid',
      '==',
      data.firebase_uid,
    );
    const querySnapshot = await query.get();
    const documents = querySnapshot.docs.map((doc) => doc.id);
    const documentId = documents[0];
    const docRef = this.firebaseAppRepository.db
      .collection('users')
      .doc(documentId);
    try {
      await docRef.delete();
      console.log('Document deleted successfully!');
      return { Message: 'Document deleted successfully!' };
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  async writeJournal(data: { firebase_uid: string; journalText: string }) {
    const query = this.firebaseAppRepository.collection.where(
      'firebase_uid',
      '==',
      data.firebase_uid,
    );
    const querySnapshot = await query.get();
    const documents = querySnapshot.docs.map((doc) => doc.id);
    const documentId = documents[0];
    const docRef = this.firebaseAppRepository.db
      .collection('users')
      .doc(documentId);

    try {
      const userDoc = await docRef.get();
      const previousJournalText = userDoc.data().journalText || [];
      const newJournalText = [...previousJournalText, data.journalText];
      await docRef.update({ journalText: newJournalText });
      console.log('Journal written successfully!');
      return { Message: 'Journal written successfully!' };
    } catch (error) {
      console.error('Error writing journal:', error);
    }
  }

  async readJournals(data: { firebase_uid: string }) {
    const query = this.firebaseAppRepository.collection.where(
      'firebase_uid',
      '==',
      data.firebase_uid,
    );
    const querySnapshot = await query.get();
    const documents = querySnapshot.docs.map((doc) => doc.id);
    const documentId = documents[0];
    const docRef = this.firebaseAppRepository.db
      .collection('users')
      .doc(documentId);

    try {
      const userDoc = await docRef.get();
      const journalText = userDoc.data().journalText || [];
      const journals = [];

      // Now you can access individual journal entries
      for (let i = 0; i < journalText.length; i++) {
        console.log(`Journal entry ${i}: ${journalText[i]}`);
        journals.push({ id: i, text: journalText[i] });
      }

      return { journals };
    } catch (error) {
      console.error('Error reading journal:', error);
      return { journals: [] };
    }
}
}

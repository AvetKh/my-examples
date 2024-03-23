import { Currency, CurrencySymbol, Language, LanguageName } from "./types";
import { LookedUpAddress, UserAddress } from "@api/types";
import dayjs from "dayjs";
import { PaymentMethod } from "@api/payment";


export const formatNumber = (value: number | string, decimal = 2) => {
	return parseFloat(String(value)).toFixed(decimal).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatPrice = (value: number | string) => {
	return formatNumber(value, Number.isInteger(value) ? 0 : 2);
};

const PaymentMethodNames: Record<PaymentMethod, string> = {
	[PaymentMethod.ARCA]: 'ArCa',
	[PaymentMethod.CASH]: 'Cash',
	[PaymentMethod.BANK]: 'Bank',
	[PaymentMethod.POS]: 'POS',
	[PaymentMethod.IDRAM]: 'iDram',
	[PaymentMethod.TELCELL]: 'TellCell',
	[PaymentMethod.GIFT_CARD]: 'Gift Card',
}

const ErrorCodes: Record<number, string | ( (err: any) => string )> = {
	425: 'Group Order not found'
};

export function errorMessage(t: Translation, error: any) {
	if (!error) {
		return undefined;
	}
	if (error.data) {
		// API error
		const messageOrFunc = t.ErrorCodes[error.data.code];
		if (messageOrFunc) {
			return typeof messageOrFunc === 'string' ? messageOrFunc : messageOrFunc(error)
		} else if (error.data.message) {
			if (typeof error.data.message === 'string') {
				return error.data.message
			} else if (error.data.message.join) {
				return error.data.message.join('\n');
			}
		} else if (error.data.messages) {
			if (typeof error.data.messages === 'string') {
				return error.data.messages
			} else if (error.data.messages.join) {
				return error.data.messages.join('\n');
			}
		}
	} else if (error.message) {
		// JS Error
		return error.message
	}
	
	return JSON.stringify(error);
}

export const en = {
	ErrorCodes,
	Common: {
		errorMessage: (err: any) => errorMessage(en, err),
		currency: (code: Currency) => code,
		currencySymbol: (code: Currency) => CurrencySymbol[code],
		paymentMethod: (method?: PaymentMethod) => PaymentMethodNames[method ?? PaymentMethod.CASH],
		language: (code: Language) => LanguageName[code],
		price: (amount: number, currency: Currency) => `${CurrencySymbol[currency]} ${formatPrice(amount)}`,
		packingPrice: (amount: number, currency: Currency) => `${CurrencySymbol[currency]} ${formatPrice(amount)}`,
		searchIn: (category: string) => `Search in ${category.length > 20 ? category.substring(0, 20) + '...' : category}`,
		seeInfo: 'See info',
		viewCart: 'View Your Cart',
		productAddToCart: (amount: number, currency: Currency) => `Add to Cart ${CurrencySymbol[currency]} ${formatPrice(amount)}`,
		updateCart: (amount: number, currency: Currency) => `Update cart ${CurrencySymbol[currency]} ${formatPrice(amount)}`,
		productQuantity: (quantity: number, unitId: number) => {
			return unitId === 2 ? `${quantity / 1000}kg` : String(quantity)
		},
		groupOrderYourItems: 'Your Items',
		groupOrderFinished: 'Finished',
		groupOrderTitle: 'Manage your group order',
		groupOrderButton: 'GROUP ORDER',
		groupOrderButtonActive: 'Share link',
		groupOrderButtonCancel: 'Cancel',
		groupOrderButtonLeave: 'Leave Group Order',
		groupOrderButtonComplete: 'Done Adding items',
		groupOrderButtonInvite: 'Invite',
		exceedingLimitTittle: 'You Can’t Add Product',
		exceedingLimitModalMessage: (limitPrice: number) => `You've exceeded the limit (${limitPrice}֏ ) that is set on this group order!`,
		groupOrderAddSupermarketProductTitle: 'You are part of a group order !',
		groupOrderAddSupermarketProductMessage: 'If you want to place an order from the supermarket section, you should cancel or leave the group order.',
		exceedingTheGroupOrderLimit: 'You\'ve exceeded the limit ',
		enGroupOrder: (name: string) => `'We\'ve let ${name} know that you\'re done adding items. We\'ll notify you once this order is placed'`,
		commonOK: 'OK',
		commonError: 'Error',
		commonWarning: 'Warning',
		commonClose: 'Close',
		copyModalTittle: 'Share link to add guests',
		copyModalDescription: 'They can add their favorite items, checkout and get it all delivered together.',
		copyModalButton: 'Share link',
		packingCost: 'Packing cost'
	},
	OutOfStock: {
		outOfStack: 'Out of Stock',
		basketUpdate: 'Basket Update',
		proceedToPayment: "Correct and proceed to payment",
		onlyStock: (inStock: number) => `Only ${inStock} left in stock.`,
		updateDescription: "Products that are currently out of stock will be removed from your cart. Apologize for inconvenience.",
		deleteDescription:"The quantities of some products have been changed. Please update your basket to proceed with your order.",
		replaceDescription: "The quantities of some products have been changed, and some items are now out of stock. Please update your basket to proceed with your order.",
		cancel: 'Cancel',
		delete: 'Remove',
		update: 'Update',
		ok: 'Ok'
	},
	Tabs: {
		home: "Home",
		restaurants: "Food Court",
		cart: "Cart",
		shops: "Stores",
		profile: "Profile",
	},
	ShopsScreen: {
		store: "Supermarkets",
		shops: "Shops",
		pharmacy: "Pharmacy",
	},
	SWCategoryScreen: {
		stores: "Supermarkets",
		shops: "Shops",
		pharmacys: "Pharmacy",
		restaurants: "Food Court",
	},
	HomeScreen: {
		modalDescription: 'Please enter a phone number so that next time you can access the site by a phone number.',
		continueButton: 'Continue',
		orderTracking: 'Order Tracking',
		seeOrderHistory: 'See Order History',
		orderNumber: 'Order Number',
		courier: 'Courier',
		dearCustomer: 'Dear customer!'
	},
	FoodPartner: {
		minutes: (min: number) => `${min} min`,
	},
	UnauthenticatedScreen: {
		title: 'Welcome to Buy.am!',
		login: 'Log In',
		register: 'Register',
	},
	LoginScreen: {
		title: 'Welcome to Buy.am!',
		inputLabel: 'Enter your Email or Phone Number',
		inputErrorValidation: 'Please enter a valid Email or Phone Number',
		notFoundError: 'We couldn\'t find an account with that email address',
		notFoundPhoneError: 'We couldn\'t find an account with that phone number',
		continueButton: 'Continue',
		createNewAccountButton: 'Create a New Account',
		socialLogin: 'Or sign in with a Social Account',
	},
	LoginPasswordScreen: {
		title: 'Login with Email',
		inputLabel: 'Enter your Password',
		invalidPassword: 'Invalid password',
		buttonLabel: 'Log in',
		footerText: 'Forgot your password?',
	},
	LoginPhoneScreen: {
		title: 'Login with Phone Number',
		description: 'We have sent a verification code via SMS',
		inputLabel: 'Enter the Code',
		incorrectCode: 'Incorrect code',
		buttonlabel: 'Log in',
		footerText: 'Didn\'t get a code?',
	},
	ForgotPasswordScreen: {
		title: 'Forgot Password',
		description: 'We have sent a verification code to your Email address. Enter the code to reset your password.',
		inputLabel: 'Enter the Code',
		incorrectCode: 'Pin is either incorrect or expired',
		buttonLabel: 'Reset Password',
		footerText: 'Didn\'t get a code?',
	},
	CreateNewPasswordScreen: {
		title: 'Create New Password',
		description: 'Your password has been reset',
		passwordLabel: 'Enter a new password',
		repeatPasswordLabel: 'Repeat the new password',
		weakPassword: 'The password is too weak. It must contain at least 8 symbols',
		passwordDoNotMatch: 'Passwords do not match',
		buttonLabel: 'Accept',
	},
	ChooseAccountScreen: {
		title: 'Choose Account',
		description: 'To login buy.am',
	},
	RegistrationScreen: {
		title: 'Register',
		inputLabel: 'Email',
		inputErrorValidation: 'Please enter a valid Email',
		emailExistError: 'Email is already being used',
		continueButton: 'Continue',
	},
	CompleteRegistrationDetailsScreen: {
		title: 'Complete your details below',
		phoneNumber: 'Phone number',
		firstName: 'First name',
		lastName: 'Last name',
		createPassword: 'Create a password',
		repeatPassword: 'Repeat your password',
		registerBusiness: 'I want to register as a company on Buy.am',
		companyName: 'Company Name',
		companyTIN: 'TIN',
		weakPassword: 'The password is too weak. It must contain at least 8 symbols',
		passwordDoNotMatch: 'Passwords do not match',
		companyTINExists: 'TIN already exists',
		continueButton: 'Continue',
	},
	ValidateEmailPhoneScreen: {
		validateEmail: 'Validate email',
		confirmationEmailDescription: 'We have sent a confirmation code to your email address. Please enter the 6-digit code in the field below:',
		inputLabel: 'Enter Confirmation Code',
		haventReceiveCode: 'I haven\'t received the code',
		validatePhoneNumber: 'Validate Phone Number',
		confirmationPhoneDescription: 'We have sent a confirmation code to your phone number. Please enter the 6-digit code in the field below:',
		incorrectEmailCodeError: 'Incorrect code. Please try again or check if you have entered a correct Email address',
		incorrectPhoneCodeError: 'Incorrect code. Please try again or check if you have entered a correct Phone number',
		completeRegistration: 'Complete Registration',
	},
	BuyWallet: {
		noHaveCards: 'You don\'t have saved bank cards.',
		addCard: 'Add card',
		setDefault: 'SET AS DEFAULT',
		default: 'Default',
		yourCardHasExpired: 'Your card has expired',
		confirmDelete: 'Confirm delete',
		areYouSureToDelete: 'Are you sure you want to delete this card?',
		cancel: 'Cancel',
		delete: 'Delete',
		formatDeliveryDate: (date: Date) => dayjs(date).locale('en').calendar(null, { sameElse: 'ddd, D MMM  HH:mm' }),
		BonusUsed: 'Withdraw',
		BonusEarned: 'Refund',
		OrderCanceled: 'Cashback',
		Point: 'Point',
		transactionHistory: 'Transaction History',
		availableBalance: 'Available balance',
		noToTransactions: 'No transactions in your history yet.',
		topUpWithCard: 'Top up with card',
		orderNumber: 'Order Number',
		ServiceFee: 'Service fee',
		YourOrder: 'Your Order',
		Delivery: 'Delivery',
		TOTAL: 'TOTAL'
	},
	GiftCards: {
		dontHaveCards: 'Your don\'t have Gift Card',
		shopNow: 'Shop now',
		footerBalance: 'Current balance:',
		giftCard: 'Gift card',
		expiryDate: 'Expiry date:',
		code: 'Code:',
		active: 'Active',
		expired: 'Expired',
		giftCardBalance: 'Balance:',
		seeDetails: 'See details',
		balance: 'Your current balance is',
		giftCardDetails: 'Gift card details',
		redeemGiftCard: 'Redeem a gift card',
		giftCardRedeemed: 'Gift Card Redeemed!',
		addedBonusBalance: 'Have been added to your Bonus Balance.',
	},
	RedeemGiftCard: {
		title: 'Redeem a gift card',
		youCandFindYourCode: 'You can find your code on the back on your gift card as shown here',
		claimCode: 'Claim code',
		codeNotExist: 'Oops! The code you entered doesn\'t exist. Please check and try again.',
		currentBalance: 'Current balance is:',
		save: 'Save',
	},
	MyAddresses: {
		dontHaveAddresses: 'You don\'t have any saved delivery addresses',
		addNewAddress: 'Add new address',
		setAsDefault: 'Set as default',
		default: 'Default',
		myAddresses: 'My Addresses',
		address: 'Address, location, city',
		entrance: 'Entrance',
		apartment: 'Apartment',
		floor: 'Floor',
		doorCode: 'Entrance code',
		saveAddress: 'Save',
		enterDetails: 'Enter details',
		pleaseAddAddress: 'Please set the delivery address',
		searchNoResults: 'Nothing found within delivery zone',
		searchPlaceHolder: 'address',
		searchTypeForResult: '',
		confirmDelete: 'Confirm delete',
		areYouSureToDelete: 'Are you sure you want to delete this address?',
		cancel: 'Cancel',
		delete: 'Delete',
	},
	Favorites: {
		emptyListDescription: 'You can add your favorite products, restaurants or shops to the list. Find them quickly and add them to your cart right from the Favorites page!',
		startShopping: 'Start Shopping',
		all: 'ALL',
		restaurants: 'RESTAURANTS',
		stores: 'SUPERMARKETS',
		products: 'PRODUCTS',
		shop: "SHOPS",
		pharmacy: "PHARMACIES",
		Partners: 'Partners',
		searchInFavorites: 'Search in favorites',
		restaurantsAndStores: 'Restaurants & Stores',
		product: 'Products',
		matching: 'Items matching'
	},
	SearchResultPanel: {
		NoResultFound: 'No result found.',
		WeCouldNtFindWhatYouAreLookingFor: 'We couldn’t find what you are looking for.',
		GoToHomePage: ' Go to Home page ',
		all: 'Partners',
		restaurant: 'Restaurants',
		store: 'Supermarkets',
		products: 'products',
		shop: "Shops",
		pharmacy: "Pharmacy",
	},
	PhoneNumberInput: {
		title: 'Choose Country',
		search: 'Search in Country',
		phoneNumber: 'Phone number',
	},
	PersonalInformation: {
		firstName: 'First Name',
		lastName: 'Last Name',
		companyName: 'Company Name',
		companyTin: 'Company TIN',
		companyTINExists: 'TIN already exists',
		invalidTIN: 'Must be at least 8 numbers',
		gender: 'Gender',
		save: 'Save',
		male: 'Male',
		personalInformation: 'Personal Information',
		businessInformation: 'Business Information',
		female: 'Female',
		changePassword: 'Change Password',
		changeContactInformation: 'Change Contact Information',
		accountDeletion: 'Account Deletion',
	},
	ChangePasswordScreen: {
		enterCurrentPassword: 'Enter your current password',
		enterNewPassword: 'Enter a new password',
		confirmNewPassword: 'Repeat the new password',
		weakPassword: 'The password is too weak. It must contain at least 8 symbols',
		wrongCurrentPasswordError: 'Wrong password',
		passwordsNotMatch: 'Password does not match',
	},
	ContactInformationScreen: {
		title: 'Contact Information',
		emailInputLabel: 'Email',
		updateNumber: 'Update Number',
		invalidPhoneError: 'Please enter a valid phone number',
		updateEmail: 'Update Email',
		invalidEmailError: 'Please enter a valid email address',
		emailExistError: 'Email already exists',
		couldNotSendSmsCode: 'We couldn\'t send the sms code.',
		tryAgainLater: 'Please try again later.',
	},
	PersonalInformationValidationScreens: {
		phoneTitle: 'Validation code was sent to your phone number',
		phoneDescription: 'You have to validate your new phone number before the changes take effect.',
		emailTitle: 'Validation code was sent to your email address',
		emailDescription: 'You have to validate your email address before the changes take effect.',
		validationCodeLabel: 'Validation code',
		resendCodeButton: 'Resend code',
		validateNumber: 'Validate Number',
		validateEmail: 'Validate Email',
		incorrectCodeError: 'The code you\'ve enetered is incorrect. Please, try again.',
	},
	AccountDeactivationScreen: {
		header1: 'Request to delete your account',
		note1: 'Please note that account closure is a permanent' +
			' action and once your Buy.am account has been closed,' +
			' it will no longer be available to you and cannot be restored.' +
			' If you decide later that you want to start ordering from us again,' +
			' or if you would like to use products and services  that require an account,' +
			' you will need to create a new account.',
		header2: 'The reason for leaving Buy.am',
		options: [
			'I no longer use the app',
			'I found better deals and options elsewhere',
			'I had a bad experience with the app or delivery service',
			'Poor customer service',
			'Technical issues or glitch',
			'Unsatisfactory food quality/delivery experience',
			'I don’t want to provide a reason',
			'Other'
		].join('\n'),
		btnCancel: 'Cancel',
		btnSubmit: 'Submit Request',
		emailSubject: 'Account Deletion Request',
		deleteAccountDescription: 'Please explain the reason',
		emailBody: (options: string[], accountId: number, fullName: string) => {
			const reasonsText = options.map(r => `[x] ${r}`).join('\n')
			return 'Dear Support Team,\n\n'
				+ 'I am writing to request the deletion of my account from buy.am platform.\n\n'
				+ `Reason for leaving:\n${reasonsText}\n`
				+ 'I understand that this action is irreversible and that I will lose access to any content, services, or benefits provided by the platform.\n'
				+ 'If you have any further questions or require additional information, please do not hesitate to reach out to me.\n'
				+ 'Yours sincerely,\n' + fullName
		}
		
	},
	OrdersHistory: {
		dontHaveOrders: 'You haven\'t made any order yet',
		shopNow: 'Shop now',
		orderDetails: 'Order Details',
		order: 'Order',
		address: 'Order',
		creationTime: 'Creation Time',
		deliveryTime: 'Delivery Time',
		paymentMethod: 'Payment method',
		orderAccepted: "Order accepted",
		inProgress: 'In progress',
		delivered: 'Delivered',
		canceled: 'Canceled',
		serviceFee: 'Service fee',
		yourOrder: 'Your Order',
		delivery: 'Delivery',
		giftCard: 'Gift Card',
		promocode: 'Promo code',
		total: 'TOTAL',
		cancelOrderButton: 'Cancel Order',
		rateOrderButton: 'Rate the Order',
		reorder: 'Reorder',
		orderPoints: 'Buy.am Wallet',
		thankYou: 'Thank You!',
		appreciateFeedback: 'We appreciate your feedback',
		rateOtherProducts: 'Rate other products',
		confirmDelete: 'Cancel confirmation',
		areYouSureToDelete: 'Are you sure you want to cancel this order?',
		cancel: 'No',
		delete: 'Yes',
	},
	OrderDetailsSteps: {
		orderAccepted: "Order accepted",
		orderIsBeingPrepared: "Order is being prepared",
		orderIsOnItsWay: "Order is on its way ",
		orderDelivered: "Delivered",
	},
	RateOrderScreen: {
		properlyCollected: 'Was the order collected properly',
		dishDelicious: 'Was the dish delicious?',
		orderAgain: 'Would you order food from this restaurant again?',
		rateDeliveryService: 'Please rate Buy.am delivery service',
		issuesWithYourExperience: 'Issues with your experience?',
		letUsKnow: 'Let us know how we can improve.',
		deliveryTime: 'Delivery time',
		courierService: 'Courier service',
		orderAccuracy: 'Order accuracy',
		good: 'Good!',
		bad: 'Bad!',
		comment: 'Comment',
		rate: 'Rate',
	},
	StartGroupOrder: {
		title: 'Start Group Order',
		info: 'Add items to this order and everything will be delivered together.',
		limitNote: 'What is your per person order limit ?',
		noLimit: 'No limit',
		otherLimit: 'Other',
		limitPlaceHolder: 'Limit',
		startButton: 'Start',
		joinGroupOrderPlaceholder: 'Join a group order',
		joinGroupOrderButton: 'Join',
		CreateAgroupOrder: 'Create a group order',
		ToCreateAGroupOrderYourBasketWillBeCleared: 'To create a group order, \n your basket will be cleared.',
		create: 'Create',
		cancel: 'Cancel'
	},
	JoinGroupOrder: {
		note: 'Join the group order.',
		noteAlreadyJoined: 'You are in group order.',
		errInvalidLink: 'The group order cannot be found',
		errHasActiveGroupOrder: 'You have an active group order! Please cancel it before joining other.',
		errInGroupOrder: 'You are already in a group order now! Please leave it before joining this one.',
		buttonLeave: 'Leave Current Group Order',
		buttonCancel: 'Cancel My Group Order',
		buttonJoin: 'Join Group Order',
		buttonClose: 'OK',
		buttonStartShopping: 'Start',
		limitTitle: 'Limit',
		limitValue: (limit: number) => limit >= 9999999 ? 'Unlimited' : en.Common.price(limit, 'AMD')
	},
	CartScreen: {
		title: 'Cart',
		emptyText: 'Your cart is currently empty',
		checkOut: 'Check Out',
		yourOrder: 'Your Order',
		serviceFee: 'Service fee',
		delivery: 'Delivery',
		promocode: 'Promo code',
		total: 'TOTAL',
		allItemsWillBeRemoved: 'All items will be removed.',
		cancelGroupOrder:  (name: string) =>  `Leave ${name}'s Group Order`,
		cancel: 'Keep order',
		delete: 'Cancel',
		usersGroupOrder: (name: string) => name?.length > 1 ? `${name}'s Group Order` : "Group Order"
	},
	CheckoutScreen: {
		Remove: "Remove",
		ok: "ok",
		AccumulatedPoints: "Accumulated points:",
		asPossible: 'As soon as possible',
		schedule: 'Schedule',
		selectATime: 'Select a time',
		title: 'Check out',
		delivery: 'Delivery',
		currentGiftCardBalance: 'Current Gift Card Balance:',
		enterAddressLabel: 'Enter your address',
		dateLabel: 'Date',
		timeLabel: 'Time',
		commentLabel: 'Comment',
		giftCardPromocodeTitle: 'Gift card and Promo code',
		enterCodeLabel: 'Enter Code',
		apply: 'Apply',
		paymentMethod: 'Payment method',
		payInCash: 'Pay in cash',
		bankTransfer: 'Bank transfer',
		posTerminal: 'POS terminal',
		addCard: 'Add card',
		proceedToPayment: 'Proceed to Payment',
		thankYouForYourPurchase: 'Thank you for your purchase!',
		yourOrderHasBeenAccepted: 'Your order has been accepted',
		useYourPointsForTheNextOrder: 'Use your points for the next order.',
		Wallet: 'More',
		Accumulated: `Accumulated :`,
		continueShopping: 'Continue Shopping',
		sorry: 'Sorry',
		checkingPayment: 'Payment confirmation',
		orderProgressTitle: (orderId: any) => `Order: #${orderId}`,
		unableToProcessThePayment: 'We were unable to process the payment',
		tryAgain: 'Try Again',
		formatDeliveryDate: (date: Date) => {
			return dayjs(date).locale('en').calendar(null, {
				sameDay: '[Today]',
				nextDay: '[Tomorrow]',
				nextWeek: 'ddd, D MMM',
				// lastDay: 'ddd, D MMM',
				// lastWeek: 'ddd, D MMM',
				sameElse: 'ddd, D MMM'
			})
		},
		formatAddressLine1: (address?: UserAddress | LookedUpAddress) => {
			let text;
			if (address) {
				if ('apartment' in address) {
					text = address.street
					text += address.apartment ? ', ' + address.apartment : '';
				} else if ('name' in address) {
					text = address.name;
				}
				
				if (address.city) {
					text && ( text += ', ' )
					text += address.city
				}
			}
			return text
		},
		formatAddressLine2: (address?: UserAddress) => {
			let addr = [];
			address?.entrance && addr.push(`entrance ${address.entrance}`)
			address?.doorCode && addr.push(`access code ${address.doorCode}`)
			address?.floor && addr.push(`floor ${address.floor}`)
			address?.apartment && addr.push(`apt. ${address.apartment}`)
			return addr.join(', ');
		},
	},
	ProfileScreen: {
		favorites: 'Favorites',
		orderHistory: 'Order History',
		personalInformation: 'Personal Information',
		businessInformation: 'Business Information',
		myAddresses: 'My Addresses',
		giftCards: 'Gift Cards',
		BuyWallet: 'Buy.am Wallet',
		logOut: 'Log out',
		myProfile: 'My Profile',
		History: 'History'
		
	},
	ArticleModal: {
		comment: "Comment",
		code: "Code : "
	},
	FilterModal: {
		priceRange: 'PRICE RANGE',
		onlySale: 'Only Sale',
		filter: 'Filter',
		sortBy: 'SORT BY',
		byCategories: 'BY CATEGORIES',
		recommended: 'Recommended',
		mostPopular: 'Most Popular',
		new: 'New',
		distance: 'Distance',
		pickedForYou: 'Picked for you',
		// deals:'Deals',
		deliveryTime: 'Delivery time',
		freeDelivery: 'Free Delivery',
		reset: 'Reset',
		apply: 'Apply',
		releaseDate: 'Release date',
		popularity: 'Popularity',
		lowestPrice: 'Lowest price',
		highestPrice: 'Highest price'
		// apply: (N: number) =>  `Apply (${N} found)`
	},
	CategoryModal: {
		seeAll: "See All"
	},
	AppBar: {
		Other: "Other",
		Categories: "Categories"
	},
	ManufactureElement: {
		Closed: 'Closed'
	},
	ClosedManufactureModal: {
		restaurant: 'Restaurant',
		store: 'Store',
		shop: 'Shop',
		pharmacy: 'Pharmacy',
		Info: (syplaerType: any) => `You can preorder from this ${syplaerType}  now, and it will be delivered when the ${syplaerType} opens.`,
		ChooseAnotherRestaurant: (syplaerType: any) => `Choose another ${syplaerType} `,
		PreorderFromThisRestaurant: `Preorder from this`,
		It_will_reopen: (date: Date) => `It will reopen at ${dayjs(date).locale('en').calendar(null, {
			sameDay: '[Today]  HH:mm',
			nextDay: '[Tomorrow]  HH:mm',
			nextWeek: 'ddd, D MMM  HH:mm',
			sameElse: 'ddd, D MMM  HH:mm'
		})
		}`,
		supplierClosed: (supplierType: any) => `${supplierType} is closed.`
	},
	NetworkStatusModalWindow: {
		OOPS: 'OOPS!',
		NoInternetConnection: 'No internet connection',
		PleaseCheckYourInternetSettings: 'Please check your internet settings',
		TryAgain: 'Try Again'
	},
	RestaurantInformation:{
		RestaurantInformation:'Restaurant Information',
		Closed : 'Closed',
		OpenNow :'Open now'
	}
}


export type Translation = typeof en;

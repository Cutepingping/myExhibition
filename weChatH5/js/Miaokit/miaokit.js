class ATexture {
    constructor(pDesc) {
        this.m_mAttachment = new Handle(Attachment, 0);
        this.m_mOffset = new Vector2(0.0, 0.0);
        this.m_mScale = new Vector2(0.0, 0.0);
        this.m_nRotate = 0;
        this.m_pDesc = null;
        this.m_bUpdated = false;
        this.desc = pDesc;
    }
    get version() {
        return 1000;
    }
    get type() {
        return EntityType.Collection;
    }
    get attachment() {
        return this.m_mAttachment.Object;
    }
    set attachment(pAttachment) {
        this.m_mAttachment.Number = pAttachment.handle.Number;
        this.m_bUpdated = true;
    }
    get displayType() {
        return DisplayType.Normal;
    }
    set displayType(eType) {
    }
    get resource() {
        return this.texture;
    }
    Remap(mHeap) {
        this.m_mAttachment.Heap = mHeap;
    }
    Apply() {
        if (this.m_bUpdated) {
            this.m_bUpdated = false;
        }
    }
    Destroy() {
        this.m_bUpdated = false;
        this.m_pDesc = null;
    }
    Clear() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mAttachment.Number = pReader.ReadUInt32();
        this.m_mOffset.x = pReader.ReadSingle();
        this.m_mOffset.y = pReader.ReadSingle();
        this.m_mScale.x = pReader.ReadSingle();
        this.m_mScale.y = pReader.ReadSingle();
        this.m_nRotate = pReader.ReadSingle();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("ATexture.UnSerialize(): Bad end!");
        }
        this.m_bUpdated = true;
    }
    get collectionType() {
        return CollectionType.ATexture;
    }
    set desc(pDesc) {
        if (this.m_pDesc == null) {
            this.offset = new Vector2(0.0, 0.0);
            this.scale = new Vector2(1.0, 1.0);
            this.rotate = 0.0;
            this.m_pDesc = pDesc;
            this.m_bUpdated = true;
        }
    }
    Inherit(pSrc) {
        let pSrcTexture = pSrc;
        this.rotate = pSrcTexture.rotate;
        return true;
    }
    get offset() {
        return new Vector2(this.m_mOffset.x, this.m_mOffset.y);
    }
    set offset(mOffset) {
        this.m_mOffset.x = mOffset.x;
        this.m_mOffset.y = mOffset.y;
    }
    get scale() {
        return new Vector2(this.m_mScale.x, this.m_mScale.y);
    }
    set scale(mScale) {
        this.m_mScale.x = mScale.x;
        this.m_mScale.y = mScale.y;
    }
    get rotate() {
        return this.m_nRotate;
    }
    set rotate(nRotate) {
        this.m_nRotate = nRotate;
    }
    get texture() {
        return this.m_pDesc == null ? null : this.m_pDesc.m_pTexture;
    }
    get textureSize() {
        return this.m_pDesc == null ? new Vector2(0.0, 0.0) : new Vector2(this.m_pDesc.m_mSize.x, this.m_pDesc.m_mSize.x);
    }
}
class ATextureDesc {
    constructor() {
        this.m_nID = 0;
        this.m_nCategoryID = 0;
        this.m_pName = null;
        this.m_mSize = new Vector2(0.0, 0.0);
        this.m_pTextureUrl = null;
        this.m_pIconUrl = null;
        this.m_pTexture = null;
        this.m_pModelType = null;
    }
    get version() {
        return 1001;
    }
    Init(jData) {
    }
    Destory() {
        this.m_pTexture = null;
    }
    Load(pProgress, pCallback) {
        if (this.m_pTextureUrl == null || this.m_pTextureUrl.length < 1) {
            pCallback(null);
            return;
        }
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadTexture(this.m_pTextureUrl, function (pTexture) {
            pThis.m_pTexture = pTexture;
            pCallback(null);
        });
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_nID = pReader.ReadInt32();
        this.m_nCategoryID = pReader.ReadInt32();
        this.m_pName = pReader.ReadString();
        this.m_mSize.x = pReader.ReadSingle();
        this.m_mSize.y = pReader.ReadSingle();
        this.m_pTextureUrl = pReader.ReadString();
        this.m_pIconUrl = pReader.ReadString();
        this.m_pModelType = pReader.ReadString();
        if (nVersion > 1000) {
            this.m_pTextureUrl = pReader.ReadString();
        }
        else {
        }
        if (nVersion > 1001) {
            let m_pTextureUrlPC = pReader.ReadString();
        }
        else {
            let m_pTextureUrlPC = "";
        }
        if (nVersion > 1002) {
            let m_pModelNum = pReader.ReadString();
        }
        else {
            let m_pModelNum = "";
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("ATexture.Desc.UnSerialize(): Bad end!");
        }
    }
    get id() {
        return this.m_nID;
    }
    get typeId() {
        return this.m_nCategoryID;
    }
    get name() {
        return this.m_pName;
    }
    get desc() {
        return "";
    }
    get iconUrl() {
        return this.m_pIconUrl;
    }
    get resource() {
        return this.m_pTexture;
    }
}
class AHoleModel {
    constructor(pDesc) {
        this.m_mAttachment = new Handle(Attachment, 0);
        this.m_bEnabled = false;
        this.m_bFlip = false;
        this.m_mOffset = new Vector3(0.0, 0.0, 0.0);
        this.m_mPosition = new Vector3(0.0, 0.0, 0.0);
        this.m_mEulerAngles = new Vector3(0.0, 0.0, 0.0);
        this.m_mLocalScale = new Vector3(0.0, 0.0, 0.0);
        this.m_pModel = null;
        this.m_pPatch = null;
        this.m_pDesc = null;
        this.m_bUpdated = false;
        this.desc = pDesc;
        this.m_bEnabled = true;
        this.m_bFlip = false;
        this.m_mOffset = new Vector3(0.0, this.m_pDesc == null ? 0.0 : this.m_pDesc.m_nDefaultHeight, 0.0);
        this.m_mLocalScale = new Vector3(1.0, 1.0, 1.0);
    }
    get version() {
        return 1000;
    }
    get type() {
        return EntityType.Collection;
    }
    get attachment() {
        return this.m_mAttachment.Object;
    }
    set attachment(pAttachment) {
        this.m_mAttachment.Number = pAttachment.handle.Number;
        this.m_bUpdated = true;
    }
    get displayType() {
        return DisplayType.Normal;
    }
    set displayType(eType) {
    }
    get resource() {
        return this.model;
    }
    Remap(mHeap) {
        this.m_mAttachment.Heap = mHeap;
    }
    Apply() {
        if (this.m_bUpdated) {
            let bActive = this.attachment == null ? false : this.attachment.active;
            if (this.model != null) {
                this.model.SetActive(bActive);
            }
            this.m_bUpdated = false;
        }
    }
    Destroy() {
        this.m_bUpdated = false;
        this.m_pModel = null;
        this.m_pPatch.Destroy();
        this.m_pPatch = null;
    }
    Clear() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mAttachment.Number = pReader.ReadUInt32();
        this.m_bEnabled = pReader.ReadBoolean();
        this.m_bFlip = pReader.ReadBoolean();
        this.m_mOffset.x = pReader.ReadSingle();
        this.m_mOffset.y = pReader.ReadSingle();
        this.m_mOffset.z = pReader.ReadSingle();
        this.m_mPosition.x = pReader.ReadSingle();
        this.m_mPosition.y = pReader.ReadSingle();
        this.m_mPosition.z = pReader.ReadSingle();
        this.m_mEulerAngles.x = pReader.ReadSingle();
        this.m_mEulerAngles.y = pReader.ReadSingle();
        this.m_mEulerAngles.z = pReader.ReadSingle();
        this.m_mLocalScale.x = pReader.ReadSingle();
        this.m_mLocalScale.y = pReader.ReadSingle();
        this.m_mLocalScale.z = pReader.ReadSingle();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("ATexture.UnSerialize(): Bad end!");
        }
        this.m_bUpdated = true;
    }
    get collectionType() {
        return CollectionType.AHoleModel;
    }
    set desc(pDesc) {
        if (this.m_pDesc == null) {
            this.m_pDesc = pDesc;
            this.m_bUpdated = true;
        }
    }
    Inherit(pSrc) {
        let pSrcHole = pSrc;
        this.enabled = pSrcHole.enabled;
        this.flip = pSrcHole.flip;
        this.size = pSrcHole.size;
        this.offset = pSrcHole.offset;
        this.Apply();
        return true;
    }
    CreateObject(pObjectRoot, pPatchRoot) {
        if (this.m_pModel == null || pObjectRoot != null) {
            this.m_pModel = this.m_pDesc.m_pModel.CloneModel();
            let pHook = this.m_pModel.AddHook();
            pHook.attachment = this.attachment;
            pHook.SetLayer();
            this.attachment.hook = pHook;
        }
        if (this.model != null) {
            this.position = this.position;
            this.eulerAngles = this.eulerAngles;
            if (pObjectRoot != null) {
                this.model.parent = pObjectRoot;
            }
            this.model.SetActive(true);
        }
    }
    get enabled() {
        return this.m_bEnabled;
    }
    set enabled(bEnabled) {
        this.m_bEnabled = bEnabled;
        if (this.model != null) {
            this.model.SetActive(this.m_bEnabled);
        }
        if (this.patch != null) {
            this.patch.SetActive(this.m_bEnabled);
        }
    }
    get flip() {
        return this.m_bFlip;
    }
    set flip(bFlip) {
        this.m_bFlip = bFlip;
        this.eulerAngles = new Vector3(0.0, 57.29578 * (3.14159274 - this.m_mOffset.z) + (this.m_bFlip ? 180.0 : 0.0), 0.0);
    }
    get size() {
        return new Vector3(this.defaultSize.x * this.localScale.x, this.defaultSize.y * this.localScale.y, this.defaultSize.z * this.localScale.z);
    }
    set size(mSize) {
        this.localScale = new Vector3(mSize.x / this.defaultSize.x, mSize.y / this.defaultSize.y, mSize.z / this.defaultSize.z);
    }
    get defaultSize() {
        return this.m_pDesc == null ? new Vector3(1.0, 1.0, 1.0) : this.m_pDesc.m_mSize;
    }
    get offset() {
        return new Vector3(this.m_mOffset.x, this.m_mOffset.y, this.m_mOffset.z);
    }
    set offset(mOffset) {
        this.m_mOffset.x = mOffset.x;
        this.m_mOffset.y = mOffset.y;
        this.m_mOffset.z = mOffset.z;
        this.m_mEulerAngles = new Vector3(0.0, 57.29578 * (3.14159274 - this.m_mOffset.z) + (this.m_bFlip ? 180.0 : 0.0), 0.0);
    }
    get position() {
        return new Vector3(this.m_mPosition.x, this.m_mPosition.y, this.m_mPosition.z);
    }
    set position(mPosition) {
        this.m_mPosition.x = mPosition.x;
        this.m_mPosition.y = mPosition.y;
        this.m_mPosition.z = mPosition.z;
        if (this.model != null) {
            this.model.position = this.m_mPosition;
        }
        this.m_bUpdated = true;
    }
    get eulerAngles() {
        return new Vector3(this.m_mEulerAngles.x, this.m_mEulerAngles.y, this.m_mEulerAngles.z);
    }
    set eulerAngles(mAngles) {
        this.m_mEulerAngles.x = mAngles.x;
        this.m_mEulerAngles.y = mAngles.y;
        this.m_mEulerAngles.z = mAngles.z;
        if (this.model != null) {
            this.model.eulerAngles = this.m_mEulerAngles;
        }
        this.m_bUpdated = true;
    }
    get localScale() {
        return new Vector3(this.m_mLocalScale.x, this.m_mLocalScale.y, this.m_mLocalScale.z);
    }
    set localScale(mScale) {
        this.m_mLocalScale.x = mScale.x;
        this.m_mLocalScale.y = mScale.y;
        this.m_mLocalScale.z = mScale.z;
        if (this.model != null) {
            this.model.localScale = this.m_mLocalScale;
        }
        this.m_bUpdated = true;
    }
    get model() {
        return this.m_pModel;
    }
    get patch() {
        return this.m_pPatch;
    }
    set patch(pPatch) {
        this.m_pPatch = pPatch;
    }
}
class AHoleModelDesc {
    constructor() {
        this.m_nID = 0;
        this.m_nCategoryID = 0;
        this.m_pName = null;
        this.m_nDefaultHeight = 0.0;
        this.m_mSize = new Vector3(0.0, 0.0, 0.0);
        this.m_pModelUrl = null;
        this.m_pIconUrl = null;
        this.m_pModel = null;
        this.m_pModelType = null;
    }
    get version() {
        return 1001;
    }
    Init(jData) {
    }
    Destory() {
        this.m_pModel = null;
    }
    Load(pProgress, pCallback) {
        if (this.m_pModelUrl == null || this.m_pModelUrl.length < 1) {
            pCallback(null);
            return;
        }
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadModel(pThis.m_pModelUrl, function (pObject) {
            pThis.m_pModel = pObject;
            pThis.m_pModel.m_pName = pThis.m_pName;
            pCallback();
        });
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_nID = pReader.ReadInt32();
        this.m_nCategoryID = pReader.ReadInt32();
        this.m_pName = pReader.ReadString();
        this.m_nDefaultHeight = pReader.ReadSingle();
        this.m_mSize.x = pReader.ReadSingle();
        this.m_mSize.y = pReader.ReadSingle();
        this.m_mSize.z = pReader.ReadSingle();
        this.m_pModelUrl = pReader.ReadString();
        this.m_pIconUrl = pReader.ReadString();
        this.m_pModelType = pReader.ReadString();
        if (nVersion > 1000) {
            this.m_pModelUrl = pReader.ReadString();
        }
        else {
        }
        if (nVersion > 1001) {
            let m_pModelUrlPC = pReader.ReadString();
        }
        else {
            let m_pModelUrlPC = "";
        }
        if (nVersion > 1002) {
            let m_pModelNum = pReader.ReadString();
        }
        else {
            let m_pModelNum = "";
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AHoleModel.Desc.UnSerialize(): Bad end!");
        }
    }
    get id() {
        return this.m_nID;
    }
    get typeId() {
        return this.m_nCategoryID;
    }
    get name() {
        return this.m_pName;
    }
    get desc() {
        return "";
    }
    get iconUrl() {
        return this.m_pIconUrl;
    }
    get resource() {
        return this.m_pModel;
    }
}
class AEdgeModel {
    constructor(pDesc) {
        this.m_mAttachment = new Handle(Attachment, 0);
        this.m_pDesc = null;
        this.m_bUpdated = false;
        this.desc = pDesc;
    }
    get version() {
        return 1000;
    }
    get type() {
        return EntityType.Collection;
    }
    get attachment() {
        return this.m_mAttachment.Object;
    }
    set attachment(pAttachment) {
        this.m_mAttachment.Number = pAttachment.handle.Number;
        this.m_bUpdated = true;
    }
    get displayType() {
        return DisplayType.Normal;
    }
    set displayType(eType) {
    }
    get resource() {
        return null;
    }
    Remap(mHeap) {
        this.m_mAttachment.Heap = mHeap;
    }
    Apply() {
        if (this.m_bUpdated) {
            this.m_bUpdated = false;
        }
    }
    Destroy() {
        this.m_bUpdated = false;
        this.m_pDesc = null;
    }
    Clear() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mAttachment.Number = pReader.ReadUInt32();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AEdgeModel.UnSerialize(): Bad end!");
        }
        this.m_bUpdated = true;
    }
    get collectionType() {
        return CollectionType.AEdgeModel;
    }
    set desc(pDesc) {
        if (this.m_pDesc == null) {
            this.m_pDesc = pDesc;
            this.m_bUpdated = true;
        }
    }
    Inherit(pSrc) {
        return true;
    }
}
class AEdgeModelDesc {
    constructor() {
        this.m_nID = 0;
        this.m_nCategoryID = 0;
        this.m_pName = null;
        this.m_mSize = new Vector3(0.0, 0.0, 0.0);
        this.m_pModelUrl = null;
        this.m_pIconUrl = null;
        this.m_pModel = null;
        this.m_pModelType = null;
    }
    get version() {
        return 1001;
    }
    Init(jData) {
    }
    Destory() {
        this.m_pModel = null;
    }
    Load(pProgress, pCallback) {
        if (this.m_pModelUrl == null || this.m_pModelUrl.length < 1) {
            pCallback(null);
            return;
        }
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadModel(pThis.m_pModelUrl, function (pObject) {
            pThis.m_pModel = pObject;
            pThis.m_pModel.m_pName = pThis.m_pName;
            pCallback();
        });
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_nID = pReader.ReadInt32();
        this.m_nCategoryID = pReader.ReadInt32();
        this.m_pName = pReader.ReadString();
        this.m_mSize.x = pReader.ReadSingle();
        this.m_mSize.y = pReader.ReadSingle();
        this.m_mSize.z = pReader.ReadSingle();
        this.m_pModelUrl = pReader.ReadString();
        this.m_pIconUrl = pReader.ReadString();
        this.m_pModelType = pReader.ReadString();
        if (nVersion > 1000) {
            this.m_pModelUrl = pReader.ReadString();
        }
        else {
        }
        if (nVersion > 1001) {
            let m_pModelUrlPC = pReader.ReadString();
        }
        else {
            let m_pModelUrlPC = "";
        }
        if (nVersion > 1002) {
            let m_pModelNum = pReader.ReadString();
        }
        else {
            let m_pModelNum = "";
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AHoleModel.Desc.UnSerialize(): Bad end!");
        }
    }
    get id() {
        return this.m_nID;
    }
    get typeId() {
        return this.m_nCategoryID;
    }
    get name() {
        return this.m_pName;
    }
    get desc() {
        return "";
    }
    get iconUrl() {
        return this.m_pIconUrl;
    }
    get resource() {
        return this.m_pModel;
    }
}
class Handle {
    constructor(CLASS, nDataID) {
        this.m_nDataID = 0;
        this.CLASS = undefined;
        this.m_nDataID = nDataID;
        this.CLASS = CLASS;
    }
    set Heap(pHeap) {
        if (this.m_nDataID != 0) {
            this.m_nDataID = (this.m_nDataID & 0xFFFFFF00) + (pHeap.Number & 0x000000FF);
        }
    }
    Destroy() {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nDataID);
        if (null != pHeap) {
            pHeap.Delete(this.m_nDataID);
        }
    }
    Transfer(pList) {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nDataID);
        if (null != pHeap) {
            return pHeap.Transfer(this.m_nDataID, pList.Number);
        }
        return false;
    }
    get Object() {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nDataID);
        if (null != pHeap) {
            return pHeap.Get(this.m_nDataID);
        }
        return null;
    }
    get Number() {
        return this.m_nDataID;
    }
    set Number(nDataID) {
        this.m_nDataID = nDataID;
    }
    Equals(pHandle) {
        if (pHandle != null) {
            return this.Number == pHandle.Number;
        }
        return null;
    }
}
class ListHandle {
    constructor(CLASS, nListID) {
        this.m_nListID = 0;
        this.CLASS = undefined;
        this.m_nListID = nListID;
        this.CLASS = CLASS;
    }
    set Heap(pHeap) {
        if (this.m_nListID != 0) {
            this.m_nListID = (this.m_nListID & 0xFFFFFF00) + (pHeap.Number & 0x000000FF);
        }
    }
    CreateData(nIndex = 0, pInitData = null) {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nListID);
        let nDataID = 0;
        if (null != pHeap) {
            nDataID = pHeap.CreateData(this.m_nListID, nIndex, pInitData);
        }
        return new Handle(this.CLASS, nDataID);
    }
    get Count() {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nListID);
        if (null != pHeap) {
            return pHeap.Count(this.m_nListID);
        }
        return 0;
    }
    get Valid() {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nListID);
        if (null != pHeap) {
            return pHeap.Valid(this.m_nListID);
        }
        return false;
    }
    Destroy() {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nListID);
        if (null != pHeap && this.m_nListID > 256) {
            pHeap.Delete(this.m_nListID);
        }
    }
    get Number() {
        return this.m_nListID;
    }
    set Number(nListID) {
        this.m_nListID = nListID;
    }
    [Symbol.iterator]() {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nListID);
        const pEntries = pHeap != null ? pHeap.m_aEntries : null;
        let nBegin = pEntries == null ? 0 : pEntries[this.m_nListID >> 8].m_nNext;
        let nIndex = 0;
        return {
            next() {
                if (pEntries != null) {
                    nIndex = nIndex == 0 ? nBegin : pEntries[nIndex].m_nNext;
                    if (nIndex > 0) {
                        return {
                            value: pEntries[nIndex].m_pData,
                            done: false
                        };
                    }
                }
                return {
                    value: undefined,
                    done: true
                };
            }
        };
    }
}
class HeapHandle {
    constructor(CLASS, nHeapID = 0) {
        this.m_nHeapID = 0;
        this.m_pHeap = null;
        this.CLASS = undefined;
        this.m_nHeapID = 0x000000FF & nHeapID;
        this.m_pHeap = null;
        this.CLASS = CLASS;
    }
    InitHeap(pReader = null) {
        if (0 == (this.m_nHeapID >> 8)) {
            this.m_nHeapID = this.CLASS.g_pContext.CreateHeap(this.m_nHeapID);
        }
        if (this.m_nHeapID > 0xFFFFFF00) {
            this.m_pHeap = this.CLASS.g_pContext.InitHeap(this.m_nHeapID, pReader);
            return true;
        }
        return false;
    }
    CreateData(nIndex = 0, pInitData = null) {
        let nDataID = 0;
        if (null != this.m_pHeap) {
            nDataID = this.m_pHeap.CreateData(0, nIndex, pInitData);
        }
        return new Handle(this.CLASS, nDataID);
    }
    CreateList() {
        let nListID = 0;
        if (null != this.m_pHeap) {
            nListID = this.m_pHeap.CreateList();
        }
        return new ListHandle(this.CLASS, nListID);
    }
    GetDefaultList() {
        return new ListHandle(this.CLASS, this.m_nHeapID & 0x000000FF);
    }
    Serialize(pWriter) {
        if (null != this.m_pHeap) {
            this.m_pHeap.Serialize(pWriter);
        }
    }
    Destroy() {
        if (null != this.m_pHeap) {
            this.m_pHeap.Destroy();
            this.m_pHeap = null;
        }
    }
    get Count() {
        if (null != this.m_pHeap) {
            return this.m_pHeap.m_nDataNum;
        }
        return 0;
    }
    get ListCount() {
        if (null != this.m_pHeap) {
            return this.m_pHeap.m_nListNum;
        }
        return 0;
    }
    get Number() {
        return this.m_nHeapID;
    }
    set Number(nHeapID) {
        this.m_nHeapID = 0x000000FF & nHeapID;
        this.m_pHeap = null;
    }
    [Symbol.iterator]() {
        const pEntries = this.m_pHeap != null ? this.m_pHeap.m_aEntries : null;
        let nIndex = 0;
        return {
            next() {
                if (pEntries != null) {
                    nIndex++;
                    while (nIndex < pEntries.length) {
                        if (pEntries[nIndex].m_pData != null) {
                            return {
                                value: pEntries[nIndex].m_pData,
                                done: false
                            };
                        }
                        nIndex++;
                    }
                }
                return {
                    value: undefined,
                    done: true
                };
            }
        };
    }
}
class HeapContext {
    constructor(CLASS) {
        this.m_nHeapNum = 0;
        this.m_aHeap = new Array(256);
        this.CLASS = CLASS;
    }
    CreateHeap(nExpectID) {
        nExpectID &= 0xFF;
        if (255 == this.m_nHeapNum) {
            return 0xFFFFFF00;
        }
        if (0 != nExpectID && null == this.m_aHeap[nExpectID]) {
            this.m_aHeap[nExpectID] = this.NewHeap();
            this.m_nHeapNum++;
            nExpectID |= 0xFFFFFF00;
            return nExpectID >>> 0;
        }
        if (nExpectID > 0) {
            console.warn("HeapContext.CreateHeap(): !nExpectID.", nExpectID);
        }
        for (let i = 1; i < 256; ++i) {
            if (null == this.m_aHeap[i]) {
                this.m_aHeap[i] = this.NewHeap();
                this.m_nHeapNum++;
                return (0xFFFFFF00 + i) >>> 0;
            }
        }
        return 0xFFFFFF00;
    }
    InitHeap(nHeapID, pReader = null) {
        nHeapID &= 0x000000FF;
        let mHeap = this.m_aHeap[nHeapID];
        if (null != mHeap) {
            if (0 == mHeap.m_nHeapID) {
                mHeap.m_nHeapID = nHeapID;
                mHeap.UnSerialize(pReader);
                return mHeap;
            }
            else if (nHeapID == mHeap.m_nHeapID) {
                mHeap.m_nCurID = 1;
                mHeap.m_nCapacity = 1;
                mHeap.m_nDataNum = 0;
                mHeap.m_nListNum = 0;
                mHeap.m_aEntries = null;
                mHeap.UnSerialize(pReader);
                return mHeap;
            }
        }
        return null;
    }
    GetHeap(nHeapID) {
        return this.m_aHeap[nHeapID & 0x000000FF];
    }
    SwitchState(aState) {
        if (aState == null) {
            aState = new Array(256);
        }
        let aOldState = this.m_aHeap;
        this.m_aHeap = aState;
        this.m_nHeapNum = 0;
        for (let i = 0; i < 256; i++) {
            if (this.m_aHeap[i] != null) {
                ++this.m_nHeapNum;
            }
        }
        return aOldState;
    }
    NewObject() {
        return new this.CLASS();
    }
    NewHeap() {
        return new ObjectHeap(this);
    }
}
class ObjectHeap {
    constructor(pContext) {
        this.m_nHeapID = 0;
        this.m_nCurID = 1;
        this.m_nCapacity = 1;
        this.m_nDataNum = 0;
        this.m_nListNum = 1;
        this.m_aEntries = null;
        this.m_pContext = null;
        this.m_pContext = pContext;
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        if (pReader == null) {
            return;
        }
        if (this.m_nHeapID != pReader.ReadUInt32()) {
            console.info("ObjectHeap.UnSerialize(): m_nHeapID != pReader.ReadUInt32()");
        }
        this.m_nCurID = pReader.ReadUInt32();
        this.m_nCapacity = pReader.ReadUInt32();
        this.m_nDataNum = pReader.ReadInt32();
        this.m_nListNum = pReader.ReadInt32();
        if (this.m_nCapacity == 1) {
            if (0xFFFFFFFF != pReader.ReadUInt32()) {
                alert("ObjectHeap.UnSerialize(): 0xFFFFFFFF != pReader.ReadUInt32()");
            }
            return;
        }
        this.m_aEntries = new Array(this.m_nCapacity);
        for (let i = 0; i < this.m_nCapacity; i++) {
            this.m_aEntries[i] = new HeapEntry();
        }
        let nCount = 0;
        let nCurID = pReader.ReadUInt32();
        while (nCurID != 0xFFFFFFFF) {
            this.m_aEntries[nCurID].m_nIndex = pReader.ReadUInt32();
            this.m_aEntries[nCurID].m_nLast = pReader.ReadUInt32();
            this.m_aEntries[nCurID].m_nNext = pReader.ReadUInt32();
            if (this.m_aEntries[nCurID].m_nLast != 0xFFFFFFFF) {
                this.m_aEntries[nCurID].m_pData = this.m_pContext.NewObject();
                this.m_aEntries[nCurID].m_pData.UnSerialize(pReader);
                this.m_aEntries[nCurID].m_pData.OnEmploy(this.m_nHeapID + (nCurID << 8));
            }
            ++nCount;
            nCurID = pReader.ReadUInt32();
        }
        if (nCount != this.m_nDataNum + this.m_nListNum) {
            alert("ObjectHeap.UnSerialize(): nCount != this.m_nDataNum + this.m_nListNum.");
        }
        for (let i = 1; i < this.m_nCapacity; i++) {
            if (this.m_aEntries[i].m_nLast != 0xFFFFFFFF && this.m_aEntries[i].m_pData == null) {
                let nLastID = i;
                this.m_nCurID = i;
                for (let j = i + 1; j < this.m_nCapacity; j++) {
                    if (this.m_aEntries[j].m_nLast != 0xFFFFFFFF && this.m_aEntries[j].m_pData == null) {
                        this.m_aEntries[nLastID].m_nIndex = j;
                        nLastID = j;
                    }
                }
                this.m_aEntries[nLastID].m_nIndex = this.m_nCapacity;
                break;
            }
        }
    }
    Destroy() {
        if (this.m_pContext.m_aHeap[this.m_nHeapID] != this) {
            alert("ObjectHeap.Destroy(): this.m_pContext.m_aHeap[this.m_nHeapID] != this.");
            return;
        }
        this.m_pContext.m_aHeap[this.m_nHeapID] = null;
        this.m_pContext.m_nHeapNum--;
    }
    Get(nID) {
        nID >>= 8;
        if (nID < this.m_nCapacity && 0xFFFFFFFF != this.m_aEntries[nID].m_nLast) {
            return this.m_aEntries[nID].m_pData;
        }
        return null;
    }
    Count(nListID) {
        nListID >>= 8;
        if (nListID < this.m_nCapacity && this.m_aEntries != null && 0xFFFFFFFF == this.m_aEntries[nListID].m_nLast) {
            return this.m_aEntries[nListID].m_nIndex;
        }
        return 0;
    }
    Valid(nListID) {
        nListID >>= 8;
        if (nListID < this.m_nCapacity && 0xFFFFFFFF == this.m_aEntries[nListID].m_nLast) {
            return true;
        }
        return false;
    }
    CreateData(nList, nIndex, pInitData) {
        nList >>= 8;
        if ((nList != 0) && (nList >= this.m_nCapacity || 0xFFFFFFFF != this.m_aEntries[nList].m_nLast)) {
            return 0;
        }
        let nCurID = this.CreateID(nList, nIndex);
        let nDataID = this.m_nHeapID + (nCurID << 8);
        if (null == pInitData) {
            pInitData = this.m_pContext.NewObject();
            pInitData.OnCreate(nDataID);
        }
        this.m_aEntries[nCurID].m_pData = pInitData;
        pInitData.OnEmploy(nDataID);
        this.m_nDataNum++;
        return nDataID;
    }
    CreateList() {
        let nCurID = this.CreateID(0xFFFFFFFF, 0);
        let nDataID = this.m_nHeapID + (nCurID << 8);
        this.m_nListNum++;
        return nDataID;
    }
    Delete(nID) {
        nID >>= 8;
        if (nID < this.m_nCapacity && (null != this.m_aEntries[nID].m_pData || 0xFFFFFFFF == this.m_aEntries[nID].m_nLast)) {
            if (0xFFFFFFFF == this.m_aEntries[nID].m_nLast) {
                let nNext = this.m_aEntries[nID].m_nNext;
                while (0 < nNext) {
                    this.m_aEntries[nNext].m_pData.OnUnemploy();
                    this.DeleteID(nNext);
                    this.m_nDataNum--;
                    nNext = this.m_aEntries[nID].m_nNext;
                }
                this.DeleteID(nID);
                this.m_nListNum--;
            }
            else {
                this.m_aEntries[nID].m_pData.OnUnemploy();
                this.DeleteID(nID);
                this.m_nDataNum--;
            }
        }
    }
    Transfer(nDataID, nListID) {
        if (this.m_nHeapID == (nListID & 0x000000FF)) {
            nListID >>= 8;
            nDataID >>= 8;
            if (nListID < this.m_nCapacity && 0xFFFFFFFF == this.m_aEntries[nListID].m_nLast) {
                if (nDataID < this.m_nCapacity && 0xFFFFFFFF != this.m_aEntries[nDataID].m_nLast) {
                    let nLast = this.m_aEntries[nDataID].m_nLast;
                    let nList = this.m_aEntries[nDataID].m_nIndex;
                    let nNext = this.m_aEntries[nDataID].m_nNext;
                    this.m_aEntries[nLast].m_nNext = nNext;
                    if (nNext > 0) {
                        this.m_aEntries[nNext].m_nLast = nLast;
                    }
                    this.m_aEntries[nList].m_nIndex--;
                    nList = nListID;
                    nLast = nList;
                    nNext = this.m_aEntries[nLast].m_nNext;
                    if (nNext > 0) {
                        this.m_aEntries[nNext].m_nLast = nDataID;
                    }
                    this.m_aEntries[nLast].m_nNext = nDataID;
                    this.m_aEntries[nDataID].m_nIndex = nList;
                    this.m_aEntries[nDataID].m_nLast = nLast;
                    this.m_aEntries[nDataID].m_nNext = nNext;
                    this.m_aEntries[nList].m_nIndex++;
                    return true;
                }
            }
        }
        return false;
    }
    CreateID(nList, nIndex) {
        if (this.m_nCurID == this.m_nCapacity) {
            if (null == this.m_aEntries && 1 == this.m_nCapacity) {
                let pDefaultList = new HeapEntry();
                pDefaultList.m_nIndex = 0;
                pDefaultList.m_nLast = 0xFFFFFFFF;
                pDefaultList.m_nNext = 0;
                this.m_aEntries = new Array();
                this.m_aEntries.push(pDefaultList);
            }
            let pEntry = new HeapEntry();
            pEntry.m_nIndex = this.m_nCapacity + 1;
            this.m_aEntries.push(pEntry);
            this.m_nCapacity++;
        }
        let nCurID = this.m_nCurID;
        this.m_nCurID = this.m_aEntries[nCurID].m_nIndex;
        if (0xFFFFFFFF != nList) {
            let nLast = nList;
            let nNext = this.m_aEntries[nLast].m_nNext;
            let nMoved = 0;
            while (nMoved < nIndex && nNext > 0) {
                nLast = nNext;
                nNext = this.m_aEntries[nLast].m_nNext;
            }
            if (nNext > 0) {
                this.m_aEntries[nNext].m_nLast = nCurID;
            }
            this.m_aEntries[nLast].m_nNext = nCurID;
            this.m_aEntries[nCurID].m_nIndex = nList;
            this.m_aEntries[nCurID].m_nLast = nLast;
            this.m_aEntries[nCurID].m_nNext = nNext;
            this.m_aEntries[nList].m_nIndex++;
        }
        else {
            this.m_aEntries[nCurID].m_nIndex = 0;
            this.m_aEntries[nCurID].m_nLast = 0xFFFFFFFF;
            this.m_aEntries[nCurID].m_nNext = 0;
        }
        return nCurID;
    }
    DeleteID(nID) {
        let nLast = this.m_aEntries[nID].m_nLast;
        if (0xFFFFFFFF != nLast) {
            let nList = this.m_aEntries[nID].m_nIndex;
            let nNext = this.m_aEntries[nID].m_nNext;
            this.m_aEntries[nLast].m_nNext = nNext;
            if (nNext > 0) {
                this.m_aEntries[nNext].m_nLast = nLast;
            }
            this.m_aEntries[nList].m_nIndex--;
        }
        this.m_aEntries[nID].m_pData = null;
        this.m_aEntries[nID].m_nIndex = this.m_nCurID;
        this.m_aEntries[nID].m_nLast = 0;
        this.m_aEntries[nID].m_nNext = 0;
        this.m_nCurID = nID;
    }
}
class HeapEntry {
    constructor() {
        this.m_pData = null;
        this.m_nIndex = 0;
        this.m_nLast = 0;
        this.m_nNext = 0;
    }
}
var AEdgeType;
(function (AEdgeType) {
    AEdgeType[AEdgeType["Default"] = 0] = "Default";
    AEdgeType[AEdgeType["Model"] = 1] = "Model";
    AEdgeType[AEdgeType["Virtual"] = 2] = "Virtual";
})(AEdgeType || (AEdgeType = {}));
class APoint {
    constructor() {
        this.m_mHandle = new Handle(APoint, 0);
        this.m_mAdjoinList = new ListHandle(AAdjoin, 0);
        this.m_mPosition = new Vector3(0.0, 0.0, 0.0);
        this.m_nDegrees = 0;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(APoint, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mAdjoinList.Number = pReader.ReadUInt32();
        this.m_mPosition.x = pReader.ReadSingle();
        this.m_mPosition.y = pReader.ReadSingle();
        this.m_mPosition.z = pReader.ReadSingle();
        this.m_nDegrees = pReader.ReadInt32();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("APoint.UnSerialize(): Bad end!");
        }
    }
}
APoint.g_pContext = new HeapContext(APoint);
class AAdjoin {
    constructor() {
        this.m_mHandle = new Handle(AAdjoin, 0);
        this.m_mAdjPoint = new Handle(APoint, 0);
        this.m_mEdge = new Handle(AEdge, 0);
        this.m_mLastAdjoin = new Handle(AAdjoin, 0);
        this.m_mNextAdjoin = new Handle(AAdjoin, 0);
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(AAdjoin, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mAdjPoint.Number = pReader.ReadUInt32();
        this.m_mEdge.Number = pReader.ReadUInt32();
        this.m_mLastAdjoin.Number = pReader.ReadUInt32();
        this.m_mNextAdjoin.Number = pReader.ReadUInt32();
        this.m_nAngle = pReader.ReadSingle();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AAdjoin.UnSerialize(): Bad end!");
        }
    }
}
AAdjoin.g_pContext = new HeapContext(AAdjoin);
class AEdge {
    constructor() {
        this.m_mHandle = new Handle(AEdge, 0);
        this.m_eType = AEdgeType.Default;
        this.m_nAngle = 0.0;
        this.m_mScale = new Vector3(0.0, 0.0, 0.0);
        this.m_mCenter = new Vector3(0.0, 0.0, 0.0);
        this.m_mShadeInfo = new Vector4(0.0, 0.0, 0.0, 0.0);
        this.m_mLeftPoint = new Handle(APoint, 0);
        this.m_mRightPoint = new Handle(APoint, 0);
        this.m_aTextures = [new Handle(Attachment, 0), new Handle(Attachment, 0)];
        this.m_mEdgeModel = new Handle(Attachment, 0);
        this.m_mHoleList = new ListHandle(Attachment, 0);
        this.m_pSketch = null;
        this.m_pMesh = null;
    }
    get version() {
        return 1000 + 1;
    }
    OnCreate(nID) {
        this.m_pSketch = new Sketch();
        this.m_pMesh = new AEdgeMesh(this);
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(AEdge, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_eType = pReader.ReadInt32();
        this.m_nAngle = pReader.ReadSingle();
        this.m_mScale.x = pReader.ReadSingle();
        this.m_mScale.y = pReader.ReadSingle();
        this.m_mScale.z = pReader.ReadSingle();
        this.m_mCenter.x = pReader.ReadSingle();
        this.m_mCenter.y = pReader.ReadSingle();
        this.m_mCenter.z = pReader.ReadSingle();
        this.m_mLeftPoint.Number = pReader.ReadUInt32();
        this.m_mRightPoint.Number = pReader.ReadUInt32();
        this.m_aTextures[0].Number = pReader.ReadUInt32();
        this.m_aTextures[1].Number = pReader.ReadUInt32();
        this.m_mEdgeModel.Number = pReader.ReadUInt32();
        this.m_mHoleList.Number = pReader.ReadUInt32();
        if (true == pReader.ReadBoolean()) {
            this.m_pSketch = new Sketch();
            this.m_pSketch.UnSerialize(pReader);
        }
        this.m_pMesh = new AEdgeMesh(this);
        if (nVersion > 1000) {
            this.m_mShadeInfo.x = pReader.ReadSingle();
            this.m_mShadeInfo.y = pReader.ReadSingle();
            this.m_mShadeInfo.z = pReader.ReadSingle();
            this.m_mShadeInfo.w = pReader.ReadSingle();
        }
        else {
            this.m_mShadeInfo = new Vector4(0.0, 1.0, 0.0, 1.0);
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AEdge.UnSerialize(): Bad end!");
        }
    }
    CreateGeometry(pLayer, bSetTex = true) {
        this.m_pMesh.CreateGeometry(pLayer, bSetTex);
    }
    ;
}
AEdge.g_pContext = new HeapContext(AEdge);
class Sketch {
    constructor() {
        this.m_aTop = null;
        this.m_aBottom = null;
        this.m_aTop = [null, null, null, null, null, null];
        this.m_aBottom = [null, null, null, null, null, null];
        for (let i = 0; i < 6; i++) {
            this.m_aTop[i] = new Vector3(0.0, 0.0, 0.0);
            this.m_aBottom[i] = new Vector3(0.0, 0.0, 0.0);
        }
    }
    version() {
        return 1000;
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        for (let i = 0; i < 6; i++) {
            this.m_aTop[i].x = pReader.ReadSingle();
            this.m_aTop[i].y = pReader.ReadSingle();
            this.m_aTop[i].z = pReader.ReadSingle();
            this.m_aBottom[i].x = pReader.ReadSingle();
            this.m_aBottom[i].y = pReader.ReadSingle();
            this.m_aBottom[i].z = pReader.ReadSingle();
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("Sketch.UnSerialize(): Bad end!");
        }
    }
}
class AMeshData {
    constructor() {
        this.m_aPosition = null;
        this.m_aNormal = null;
        this.m_aTexUV = null;
        this.m_nCount = 0;
    }
}
class AMeshBuilder {
    constructor() {
        this.m_nSize = 0;
        this.m_nCapacity = 0;
        this.m_aPosition = null;
        this.m_aNormal = null;
        this.m_aTexUV = null;
    }
    Clear() {
        this.m_nSize = 0;
    }
    PushTriangle(aPosition, aNormal, aTexUV) {
        this.Extend();
        for (let i = 0; i < 3; i++) {
            let nOffset = 3 * this.m_nSize;
            this.m_aPosition[nOffset] = aPosition[i].x;
            this.m_aPosition[nOffset + 1] = aPosition[i].y;
            this.m_aPosition[nOffset + 2] = aPosition[i].z;
            this.m_aNormal[nOffset] = aNormal[i].x;
            this.m_aNormal[nOffset + 1] = aNormal[i].y;
            this.m_aNormal[nOffset + 2] = aNormal[i].z;
            nOffset = 2 * this.m_nSize;
            this.m_aTexUV[nOffset] = aTexUV[i].x;
            this.m_aTexUV[nOffset + 1] = aTexUV[i].y;
            this.m_nSize++;
        }
    }
    GetMeshData() {
        let mMeshData = null;
        if (this.m_nSize > 0) {
            mMeshData = new AMeshData();
            mMeshData.m_aPosition = this.m_aPosition.slice(0, this.m_nSize * 3);
            mMeshData.m_aNormal = this.m_aNormal.slice(0, this.m_nSize * 3);
            mMeshData.m_aTexUV = this.m_aTexUV.slice(0, this.m_nSize * 2);
            mMeshData.m_nCount = this.m_nSize;
        }
        return mMeshData;
    }
    Extend() {
        if (this.m_nSize == this.m_nCapacity) {
            let nNewCapacity = this.m_nCapacity + (256 * 3);
            let aNewPosition = new Float32Array(nNewCapacity * 3);
            if (this.m_aPosition != null) {
                aNewPosition.set(this.m_aPosition);
            }
            this.m_aPosition = aNewPosition;
            let aNewNormal = new Float32Array(nNewCapacity * 3);
            if (this.m_aNormal != null) {
                aNewNormal.set(this.m_aNormal);
            }
            this.m_aNormal = aNewNormal;
            let aNewTexUV = new Float32Array(nNewCapacity * 2);
            if (this.m_aTexUV != null) {
                aNewTexUV.set(this.m_aTexUV);
            }
            this.m_aTexUV = aNewTexUV;
            this.m_nCapacity = nNewCapacity;
        }
    }
}
class AEdgeMesh {
    constructor(pEdge) {
        this.m_pEdge = null;
        this.m_aMeshData = [null, null, null, null, null];
        this.m_pModels = null;
        this.m_pMesh = null;
        this.m_pPatchRoot = null;
        this.m_aSubMesh = null;
        this.m_aSubMaterial = [null, null, null, null, null];
        this.m_pEdge = pEdge;
    }
    CreateGeometry(pLayer, bSetTex = true) {
        let pEdge = this.m_pEdge;
        if (pEdge != null) {
            this.m_pPatchRoot = pLayer.m_pPatchRoot;
            let pSketch = pEdge.m_pSketch;
            let nHoleCount = pEdge.m_mHoleList.Count;
            let pHoleList = nHoleCount > 0 ? this.GetHoleSketch(pEdge.m_mHoleList, pEdge.m_nAngle) : null;
            if (pHoleList != null) {
                if (pEdge.m_eType == AEdgeType.Model) {
                }
                else if (pEdge.m_eType == AEdgeType.Default) {
                    this.BuildFrontMesh2(pSketch, pHoleList, ALiner.g_aMeshBuilder[0]);
                    this.BuildBackMesh2(pSketch, pHoleList, ALiner.g_aMeshBuilder[1]);
                    this.BuildBorderMesh(pSketch, ALiner.g_aMeshBuilder[2]);
                    this.BuildInborderMesh(pSketch, pHoleList, ALiner.g_aMeshBuilder[3]);
                    this.BuildShadowMesh(pEdge, ALiner.g_aMeshBuilder[4]);
                }
            }
            else {
                if (pEdge.m_eType == AEdgeType.Model) {
                }
                else if (pEdge.m_eType == AEdgeType.Default) {
                    this.BuildFrontMesh(pSketch, ALiner.g_aMeshBuilder[0]);
                    this.BuildBackMesh(pSketch, ALiner.g_aMeshBuilder[1]);
                    this.BuildBorderMesh(pSketch, ALiner.g_aMeshBuilder[2]);
                    this.BuildInborderMesh(pSketch, null, ALiner.g_aMeshBuilder[3]);
                    this.BuildShadowMesh(pEdge, ALiner.g_aMeshBuilder[4]);
                }
            }
        }
    }
    PlaceHole(pHoleRoot, pPatchRoot) {
        let pEdge = this.m_pEdge;
        for (let pAttachment of pEdge.m_mHoleList) {
            let pHole = pAttachment.entity;
            if (pHole != null && pHole.enabled) {
                let mOffset = pHole.offset;
                mOffset.z = pEdge.m_nAngle;
                pHole.offset = mOffset;
                let pItem = pAttachment.menuItem.Object;
                if (pItem != null) {
                    pItem.LoadAndSet(null, function (pValid) {
                        pHole.CreateObject(pHoleRoot, pPatchRoot);
                    });
                }
            }
        }
    }
    CreateMeshObject(pLayer) {
        alert("AEdgeMesh.CreateMeshObject(): Discarded.");
        if (this.m_aSubMesh == null) {
            this.m_aSubMesh = [null, null, null, null, null];
            this.m_aSubMaterial[0] = new Material(MaterialType.Edge);
            this.m_aSubMaterial[1] = new Material(MaterialType.Edge);
            this.m_aSubMaterial[2] = new Material(MaterialType.Border);
            this.m_aSubMaterial[3] = new Material(MaterialType.Inborder);
            this.m_aSubMaterial[4] = new Material(MaterialType.AreaBottomShadow);
            this.m_aSubMaterial[0].SetTextureOffset(1, { x: this.m_pEdge.m_mShadeInfo.x, y: 0.0 });
            this.m_aSubMaterial[0].SetTextureScale(1, { x: this.m_pEdge.m_mShadeInfo.y, y: -1.0 });
            this.m_aSubMaterial[1].SetTextureOffset(1, { x: this.m_pEdge.m_mShadeInfo.z, y: 0.0 });
            this.m_aSubMaterial[1].SetTextureScale(1, { x: this.m_pEdge.m_mShadeInfo.w, y: -1.0 });
        }
        if (pLayer != null) {
            this.m_pMesh = new GameObject("----Edge: " + (this.m_pEdge.m_mHandle.Number >> 8), GameObjectType.Empty);
            this.m_pMesh.parent = pLayer.m_pEdgeRoot;
            this.m_aSubMesh[0] = new GameObject("Front", GameObjectType.Mesh);
            this.m_aSubMesh[1] = new GameObject("Back", GameObjectType.Mesh);
            this.m_aSubMesh[2] = new GameObject("Border", GameObjectType.Mesh);
            this.m_aSubMesh[3] = new GameObject("Inborder", GameObjectType.Mesh);
            this.m_aSubMesh[4] = new GameObject("Shadow", GameObjectType.Mesh);
            this.m_aSubMesh[0].parent = this.m_pMesh;
            this.m_aSubMesh[1].parent = this.m_pMesh;
            this.m_aSubMesh[2].parent = this.m_pMesh;
            this.m_aSubMesh[3].parent = this.m_pMesh;
            this.m_aSubMesh[4].parent = this.m_pMesh;
        }
        for (let i = 0; i < 5; i++) {
            if (this.m_aMeshData[i] != null) {
                this.m_aSubMesh[i].SetGeometry(this.m_aMeshData[i], this.m_aSubMaterial[i]);
                this.m_aSubMesh[i].SetActive(true);
            }
            else {
                this.m_aSubMesh[i].SetActive(false);
            }
        }
    }
    GetHoleSketch(mHoleList, nAngle) {
        let mSketchList = new Array();
        let nSin = Mathf.Sin(nAngle);
        let nCos = Mathf.Cos(nAngle);
        for (let pAttachment of mHoleList) {
            let pHole = pAttachment.entity;
            if (pHole != null && pHole.enabled) {
                let mSize = pHole.size;
                let mPosition = pHole.position;
                let mHalf = new Vector3(mSize.x / 2.0, mSize.y / 2.0, mSize.z / 2.0);
                let pSketch = new Sketch();
                pSketch.m_aBottom[1].x = (nCos * -mHalf.x) - (nSin * mHalf.z);
                pSketch.m_aBottom[1].y = -mHalf.y;
                pSketch.m_aBottom[1].z = (nSin * -mHalf.x) + (nCos * mHalf.z);
                pSketch.m_aBottom[1].x += mPosition.x;
                pSketch.m_aBottom[1].y += mPosition.y;
                pSketch.m_aBottom[1].z += mPosition.z;
                pSketch.m_aBottom[2].x = (nCos * mHalf.x) - (nSin * mHalf.z);
                pSketch.m_aBottom[2].y = -mHalf.y;
                pSketch.m_aBottom[2].z = (nSin * mHalf.x) + (nCos * mHalf.z);
                pSketch.m_aBottom[2].x += mPosition.x;
                pSketch.m_aBottom[2].y += mPosition.y;
                pSketch.m_aBottom[2].z += mPosition.z;
                pSketch.m_aBottom[4].x = (nCos * mHalf.x) - (nSin * -mHalf.z);
                pSketch.m_aBottom[4].y = -mHalf.y;
                pSketch.m_aBottom[4].z = (nSin * mHalf.x) + (nCos * -mHalf.z);
                pSketch.m_aBottom[4].x += mPosition.x;
                pSketch.m_aBottom[4].y += mPosition.y;
                pSketch.m_aBottom[4].z += mPosition.z;
                pSketch.m_aBottom[5].x = (nCos * -mHalf.x) - (nSin * -mHalf.z);
                pSketch.m_aBottom[5].y = -mHalf.y;
                pSketch.m_aBottom[5].z = (nSin * -mHalf.x) + (nCos * -mHalf.z);
                pSketch.m_aBottom[5].x += mPosition.x;
                pSketch.m_aBottom[5].y += mPosition.y;
                pSketch.m_aBottom[5].z += mPosition.z;
                pSketch.m_aTop[1] = Vector3.Clone(pSketch.m_aBottom[1]);
                pSketch.m_aTop[1].y += mSize.y;
                pSketch.m_aTop[2] = Vector3.Clone(pSketch.m_aBottom[2]);
                pSketch.m_aTop[2].y += mSize.y;
                pSketch.m_aTop[4] = Vector3.Clone(pSketch.m_aBottom[4]);
                pSketch.m_aTop[4].y += mSize.y;
                pSketch.m_aTop[5] = Vector3.Clone(pSketch.m_aBottom[5]);
                pSketch.m_aTop[5].y += mSize.y;
                mSketchList.push(pSketch);
            }
        }
        if (mSketchList.length > 0) {
            return mSketchList;
        }
        return null;
    }
    BuildFrontMesh(pSketch, pBuilder) {
        let aPosition = [null, null, null];
        let aNormal = [null, null, null];
        let aTexUV = [null, null, null];
        if (pBuilder == null) {
            pBuilder = AEdgeMesh.g_pMeshBuilder;
            pBuilder.Clear();
        }
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[5]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[5]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[4]);
        aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
        aNormal[1] = Vector3.Clone(aNormal[0]);
        aNormal[2] = Vector3.Clone(aNormal[1]);
        aTexUV[0] = { x: 0.0, y: 1.0 };
        aTexUV[1] = { x: 0.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[5]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[4]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[4]);
        aTexUV[0] = { x: 0.0, y: 1.0 };
        aTexUV[1] = { x: 1.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        if (pBuilder == AEdgeMesh.g_pMeshBuilder) {
            this.m_aMeshData[0] = pBuilder.GetMeshData();
        }
    }
    BuildFrontMesh2(pSketch, pHoleList, pBuilder) {
        let aPosition = [null, null, null];
        let aNormal = [null, null, null];
        let aTexUV = [null, null, null];
        if (pBuilder == null) {
            pBuilder = AEdgeMesh.g_pMeshBuilder;
            pBuilder.Clear();
        }
        aNormal[0] = Vector3.Cross(Vector3.Sub(pSketch.m_aTop[5], pSketch.m_aBottom[5]), Vector3.Sub(pSketch.m_aTop[4], pSketch.m_aBottom[5]));
        aNormal[1] = Vector3.Clone(aNormal[0]);
        aNormal[2] = Vector3.Clone(aNormal[0]);
        let nEdgeHeight = pSketch.m_aTop[5].y;
        let mLineStart = Vector3.Clone(pSketch.m_aBottom[5]);
        let mLineEnd = Vector3.Clone(pSketch.m_aBottom[4]);
        let nLineSize = Vector3.Distance(mLineEnd, mLineStart);
        let aRectPoint = [null, null, null, null];
        let aRectUV = [null, null, null, null];
        aRectPoint[0] = Vector3.Clone(pSketch.m_aBottom[5]);
        aRectPoint[1] = Vector3.Clone(pSketch.m_aTop[5]);
        aRectUV[0] = { x: 0.0, y: 1.0 };
        aRectUV[1] = { x: 0.0, y: 0.0 };
        for (let i = 0; i < pHoleList.length; i++) {
            let pHole = pHoleList[i];
            let nLeftU = Vector3.Distance(pHole.m_aBottom[5], mLineStart) / nLineSize;
            let nRightU = Vector3.Distance(pHole.m_aBottom[4], mLineStart) / nLineSize;
            let nTopV = 1.0 - pHole.m_aTop[5].y / nEdgeHeight;
            let nBottomV = 1.0 - pHole.m_aBottom[5].y / nEdgeHeight;
            aRectPoint[2] = Vector3.Clone(pHole.m_aBottom[5]);
            aRectPoint[2].y = aRectPoint[1].y;
            aRectPoint[3] = Vector3.Clone(aRectPoint[2]);
            aRectPoint[3].y = 0.0;
            aRectUV[2] = { x: nLeftU, y: 0.0 };
            aRectUV[3] = { x: nLeftU, y: 1.0 };
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[1]);
            aPosition[2] = Vector3.Clone(aRectPoint[2]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[1]);
            aTexUV[2] = Vector2.Clone(aRectUV[2]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[2]);
            aPosition[2] = Vector3.Clone(aRectPoint[3]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[2]);
            aTexUV[2] = Vector2.Clone(aRectUV[3]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aRectPoint[0] = Vector3.Clone(pHole.m_aTop[5]);
            aRectPoint[3] = Vector3.Clone(pHole.m_aTop[4]);
            aRectPoint[1] = Vector3.Clone(aRectPoint[0]);
            aRectPoint[1].y = nEdgeHeight;
            aRectPoint[2] = Vector3.Clone(aRectPoint[3]);
            aRectPoint[2].y = nEdgeHeight;
            aRectUV[0] = { x: nLeftU, y: nTopV };
            aRectUV[1] = { x: nLeftU, y: 0.0 };
            aRectUV[2] = { x: nRightU, y: 0.0 };
            aRectUV[3] = { x: nRightU, y: nTopV };
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[1]);
            aPosition[2] = Vector3.Clone(aRectPoint[2]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[1]);
            aTexUV[2] = Vector2.Clone(aRectUV[2]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[2]);
            aPosition[2] = Vector3.Clone(aRectPoint[3]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[2]);
            aTexUV[2] = Vector2.Clone(aRectUV[3]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aRectPoint[1] = Vector3.Clone(pHole.m_aBottom[5]);
            aRectPoint[2] = Vector3.Clone(pHole.m_aBottom[4]);
            aRectPoint[0] = Vector3.Clone(aRectPoint[1]);
            aRectPoint[0].y = 0.0;
            aRectPoint[3] = Vector3.Clone(aRectPoint[2]);
            aRectPoint[3].y = 0.0;
            aRectUV[0] = { x: nLeftU, y: 1.0 };
            aRectUV[1] = { x: nLeftU, y: nBottomV };
            aRectUV[2] = { x: nRightU, y: nBottomV };
            aRectUV[3] = { x: nRightU, y: 1.0 };
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[1]);
            aPosition[2] = Vector3.Clone(aRectPoint[2]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[1]);
            aTexUV[2] = Vector2.Clone(aRectUV[2]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[2]);
            aPosition[2] = Vector3.Clone(aRectPoint[3]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[2]);
            aTexUV[2] = Vector2.Clone(aRectUV[3]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aRectPoint[0] = Vector3.Clone(aRectPoint[3]);
            aRectPoint[1] = Vector3.Clone(aRectPoint[3]);
            aRectPoint[1].y = nEdgeHeight;
            aRectUV[0] = { x: nRightU, y: 1.0 };
            aRectUV[1] = { x: nRightU, y: 0.0 };
        }
        aRectPoint[2] = pSketch.m_aTop[4];
        aRectPoint[3] = pSketch.m_aBottom[4];
        aRectUV[2] = { x: 1.0, y: 0.0 };
        aRectUV[3] = { x: 1.0, y: 1.0 };
        aPosition[0] = Vector3.Clone(aRectPoint[0]);
        aPosition[1] = Vector3.Clone(aRectPoint[1]);
        aPosition[2] = Vector3.Clone(aRectPoint[2]);
        aTexUV[0] = Vector2.Clone(aRectUV[0]);
        aTexUV[1] = Vector2.Clone(aRectUV[1]);
        aTexUV[2] = Vector2.Clone(aRectUV[2]);
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(aRectPoint[0]);
        aPosition[1] = Vector3.Clone(aRectPoint[2]);
        aPosition[2] = Vector3.Clone(aRectPoint[3]);
        aTexUV[0] = Vector2.Clone(aRectUV[0]);
        aTexUV[1] = Vector2.Clone(aRectUV[2]);
        aTexUV[2] = Vector2.Clone(aRectUV[3]);
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        if (pBuilder == AEdgeMesh.g_pMeshBuilder) {
            this.m_aMeshData[0] = pBuilder.GetMeshData();
        }
    }
    BuildBackMesh(pSketch, pBuilder) {
        let aPosition = [null, null, null];
        let aNormal = [null, null, null];
        let aTexUV = [null, null, null];
        if (pBuilder == null) {
            pBuilder = AEdgeMesh.g_pMeshBuilder;
            pBuilder.Clear();
        }
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[2]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[2]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[1]);
        aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
        aNormal[1] = Vector3.Clone(aNormal[0]);
        aNormal[2] = Vector3.Clone(aNormal[0]);
        aTexUV[0] = { x: 0.0, y: 1.0 };
        aTexUV[1] = { x: 0.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[2]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[1]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[1]);
        aTexUV[0] = { x: 0.0, y: 1.0 };
        aTexUV[1] = { x: 1.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        if (pBuilder == AEdgeMesh.g_pMeshBuilder) {
            this.m_aMeshData[1] = pBuilder.GetMeshData();
        }
    }
    BuildBackMesh2(pSketch, pHoleList, pBuilder) {
        let aPosition = [null, null, null];
        let aNormal = [null, null, null];
        let aTexUV = [null, null, null];
        if (pBuilder == null) {
            pBuilder = AEdgeMesh.g_pMeshBuilder;
            pBuilder.Clear();
        }
        aNormal[0] = Vector3.Cross(Vector3.Sub(pSketch.m_aTop[2], pSketch.m_aBottom[2]), Vector3.Sub(pSketch.m_aTop[1], pSketch.m_aBottom[2]));
        aNormal[1] = Vector3.Clone(aNormal[0]);
        aNormal[2] = Vector3.Clone(aNormal[0]);
        let nEdgeHeight = pSketch.m_aTop[2].y;
        let mLineStart = Vector3.Clone(pSketch.m_aBottom[2]);
        let mLineEnd = Vector3.Clone(pSketch.m_aBottom[1]);
        let nLineSize = Vector3.Distance(mLineEnd, mLineStart);
        let aRectPoint = [null, null, null, null];
        let aRectUV = [null, null, null, null];
        aRectPoint[0] = Vector3.Clone(pSketch.m_aBottom[2]);
        aRectPoint[1] = Vector3.Clone(pSketch.m_aTop[2]);
        aRectUV[0] = { x: 0.0, y: 1.0 };
        aRectUV[1] = { x: 0.0, y: 0.0 };
        for (let i = pHoleList.length - 1; i > -1; i--) {
            let pHole = pHoleList[i];
            let nLeftU = Vector3.Distance(pHole.m_aBottom[2], mLineStart) / nLineSize;
            let nRightU = Vector3.Distance(pHole.m_aBottom[1], mLineStart) / nLineSize;
            let nTopV = 1.0 - pHole.m_aTop[2].y / nEdgeHeight;
            let nBottomV = 1.0 - pHole.m_aBottom[2].y / nEdgeHeight;
            aRectPoint[2] = Vector3.Clone(pHole.m_aBottom[2]);
            aRectPoint[2].y = aRectPoint[1].y;
            aRectPoint[3] = Vector3.Clone(aRectPoint[2]);
            aRectPoint[3].y = 0.0;
            aRectUV[2] = { x: nLeftU, y: 0.0 };
            aRectUV[3] = { x: nLeftU, y: 1.0 };
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[1]);
            aPosition[2] = Vector3.Clone(aRectPoint[2]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[1]);
            aTexUV[2] = Vector2.Clone(aRectUV[2]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[2]);
            aPosition[2] = Vector3.Clone(aRectPoint[3]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[2]);
            aTexUV[2] = Vector2.Clone(aRectUV[3]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aRectPoint[0] = Vector3.Clone(pHole.m_aTop[2]);
            aRectPoint[3] = Vector3.Clone(pHole.m_aTop[1]);
            aRectPoint[1] = Vector3.Clone(aRectPoint[0]);
            aRectPoint[1].y = nEdgeHeight;
            aRectPoint[2] = Vector3.Clone(aRectPoint[3]);
            aRectPoint[2].y = nEdgeHeight;
            aRectUV[0] = { x: nLeftU, y: nTopV };
            aRectUV[1] = { x: nLeftU, y: 0.0 };
            aRectUV[2] = { x: nRightU, y: 0.0 };
            aRectUV[3] = { x: nRightU, y: nTopV };
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[1]);
            aPosition[2] = Vector3.Clone(aRectPoint[2]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[1]);
            aTexUV[2] = Vector2.Clone(aRectUV[2]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[2]);
            aPosition[2] = Vector3.Clone(aRectPoint[3]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[2]);
            aTexUV[2] = Vector2.Clone(aRectUV[3]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aRectPoint[1] = Vector3.Clone(pHole.m_aBottom[2]);
            aRectPoint[2] = Vector3.Clone(pHole.m_aBottom[1]);
            aRectPoint[0] = Vector3.Clone(aRectPoint[1]);
            aRectPoint[0].y = 0.0;
            aRectPoint[3] = Vector3.Clone(aRectPoint[2]);
            aRectPoint[3].y = 0.0;
            aRectUV[0] = { x: nLeftU, y: 1.0 };
            aRectUV[1] = { x: nLeftU, y: nBottomV };
            aRectUV[2] = { x: nRightU, y: nBottomV };
            aRectUV[3] = { x: nRightU, y: 1.0 };
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[1]);
            aPosition[2] = Vector3.Clone(aRectPoint[2]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[1]);
            aTexUV[2] = Vector2.Clone(aRectUV[2]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[2]);
            aPosition[2] = Vector3.Clone(aRectPoint[3]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[2]);
            aTexUV[2] = Vector2.Clone(aRectUV[3]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aRectPoint[0] = Vector3.Clone(aRectPoint[3]);
            aRectPoint[1] = Vector3.Clone(aRectPoint[3]);
            aRectPoint[1].y = nEdgeHeight;
            aRectUV[0] = { x: nRightU, y: 1.0 };
            aRectUV[1] = { x: nRightU, y: 0.0 };
        }
        aRectPoint[2] = pSketch.m_aTop[1];
        aRectPoint[3] = pSketch.m_aBottom[1];
        aRectUV[2] = { x: 1.0, y: 0.0 };
        aRectUV[3] = { x: 1.0, y: 1.0 };
        aPosition[0] = Vector3.Clone(aRectPoint[0]);
        aPosition[1] = Vector3.Clone(aRectPoint[1]);
        aPosition[2] = Vector3.Clone(aRectPoint[2]);
        aTexUV[0] = Vector2.Clone(aRectUV[0]);
        aTexUV[1] = Vector2.Clone(aRectUV[1]);
        aTexUV[2] = Vector2.Clone(aRectUV[2]);
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(aRectPoint[0]);
        aPosition[1] = Vector3.Clone(aRectPoint[2]);
        aPosition[2] = Vector3.Clone(aRectPoint[3]);
        aTexUV[0] = Vector2.Clone(aRectUV[0]);
        aTexUV[1] = Vector2.Clone(aRectUV[2]);
        aTexUV[2] = Vector2.Clone(aRectUV[3]);
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        if (pBuilder == AEdgeMesh.g_pMeshBuilder) {
            this.m_aMeshData[1] = pBuilder.GetMeshData();
        }
    }
    BuildBorderMesh(pSketch, pBuilder) {
        let aPosition = [null, null, null];
        let aNormal = [null, null, null];
        let aTexUV = [null, null, null];
        if (pBuilder == null) {
            pBuilder = AEdgeMesh.g_pMeshBuilder;
            pBuilder.Clear();
        }
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aBottom[5]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[4]);
        aNormal[0] = { x: 0.0, y: -1.0, z: 0.0 };
        aNormal[1] = { x: 0.0, y: -1.0, z: 0.0 };
        aNormal[2] = { x: 0.0, y: -1.0, z: 0.0 };
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 0.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aBottom[4]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[3]);
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 1.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.5 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aBottom[3]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[2]);
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 1.0, y: 0.5 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aBottom[2]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[1]);
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 1.0, y: 1.0 };
        aTexUV[2] = { x: 0.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aTop[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[1]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[2]);
        aNormal[0] = { x: 0.0, y: 1.0, z: 0.0 };
        aNormal[1] = { x: 0.0, y: 1.0, z: 0.0 };
        aNormal[2] = { x: 0.0, y: 1.0, z: 0.0 };
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 0.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aTop[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[2]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[3]);
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 1.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.5 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aTop[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[3]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[4]);
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 1.0, y: 0.5 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aTop[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[4]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[5]);
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 1.0, y: 1.0 };
        aTexUV[2] = { x: 0.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        if (pBuilder == AEdgeMesh.g_pMeshBuilder) {
            this.m_aMeshData[2] = pBuilder.GetMeshData();
        }
    }
    BuildInborderMesh(pSketch, pHoleList, pBuilder) {
        let aPosition = [null, null, null];
        let aNormal = [null, null, null];
        let aTexUV = [null, null, null];
        if (pBuilder == null) {
            pBuilder = AEdgeMesh.g_pMeshBuilder;
            pBuilder.Clear();
        }
        if (pHoleList != null) {
            for (let pHole of pHoleList) {
                aPosition[0] = Vector3.Clone(pHole.m_aBottom[5]);
                aPosition[1] = Vector3.Clone(pHole.m_aTop[5]);
                aPosition[2] = Vector3.Clone(pHole.m_aTop[1]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 0.0, y: 1.0 };
                aTexUV[1] = { x: 0.0, y: 0.0 };
                aTexUV[2] = { x: 1.0, y: 0.0 };
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
                aPosition[0] = Vector3.Clone(pHole.m_aBottom[5]);
                aPosition[1] = Vector3.Clone(pHole.m_aTop[1]);
                aPosition[2] = Vector3.Clone(pHole.m_aBottom[1]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 0.0, y: 1.0 };
                aTexUV[1] = { x: 1.0, y: 0.0 };
                aTexUV[2] = { x: 1.0, y: 1.0 };
                ;
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
                aPosition[0] = Vector3.Clone(pHole.m_aBottom[2]);
                aPosition[1] = Vector3.Clone(pHole.m_aTop[2]);
                aPosition[2] = Vector3.Clone(pHole.m_aTop[4]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 0.0, y: 1.0 };
                aTexUV[1] = { x: 0.0, y: 0.0 };
                aTexUV[2] = { x: 1.0, y: 0.0 };
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
                aPosition[0] = Vector3.Clone(pHole.m_aBottom[2]);
                aPosition[1] = Vector3.Clone(pHole.m_aTop[4]);
                aPosition[2] = Vector3.Clone(pHole.m_aBottom[4]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 0.0, y: 1.0 };
                aTexUV[1] = { x: 1.0, y: 0.0 };
                aTexUV[2] = { x: 1.0, y: 1.0 };
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
                aPosition[0] = Vector3.Clone(pHole.m_aBottom[5]);
                aPosition[1] = Vector3.Clone(pHole.m_aBottom[1]);
                aPosition[2] = Vector3.Clone(pHole.m_aBottom[2]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 0.0, y: 0.0 };
                aTexUV[1] = { x: 0.0, y: 0.0 };
                aTexUV[2] = { x: 0.0, y: 0.0 };
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
                aPosition[0] = Vector3.Clone(pHole.m_aBottom[5]);
                aPosition[1] = Vector3.Clone(pHole.m_aBottom[2]);
                aPosition[2] = Vector3.Clone(pHole.m_aBottom[4]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 0.0, y: 0.0 };
                aTexUV[1] = { x: 0.0, y: 0.0 };
                aTexUV[2] = { x: 0.0, y: 0.0 };
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
                aPosition[0] = Vector3.Clone(pHole.m_aTop[1]);
                aPosition[1] = Vector3.Clone(pHole.m_aTop[5]);
                aPosition[2] = Vector3.Clone(pHole.m_aTop[4]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 1.0, y: 1.0 };
                aTexUV[1] = { x: 1.0, y: 1.0 };
                aTexUV[2] = { x: 1.0, y: 1.0 };
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
                aPosition[0] = Vector3.Clone(pHole.m_aTop[1]);
                aPosition[1] = Vector3.Clone(pHole.m_aTop[4]);
                aPosition[2] = Vector3.Clone(pHole.m_aTop[2]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 1.0, y: 1.0 };
                aTexUV[1] = { x: 1.0, y: 1.0 };
                aTexUV[2] = { x: 1.0, y: 1.0 };
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            }
        }
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aBottom[1]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[1]);
        aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
        aNormal[1] = Vector3.Clone(aNormal[0]);
        aNormal[2] = Vector3.Clone(aNormal[0]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 0.0, y: 1.0 };
        aTexUV[2] = { x: 0.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[1]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[0]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 0.0, y: 0.0 };
        aTexUV[2] = { x: 0.5, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[0]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[5]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 0.5, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[5]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[5]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 1.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[3]);
        aPosition[1] = Vector3.Clone(pSketch.m_aBottom[4]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[4]);
        aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
        aNormal[1] = Vector3.Clone(aNormal[0]);
        aNormal[2] = Vector3.Clone(aNormal[0]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 0.0, y: 1.0 };
        aTexUV[2] = { x: 0.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[3]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[4]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[3]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 0.0, y: 0.0 };
        aTexUV[2] = { x: 0.5, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[3]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[3]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[2]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 0.5, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[3]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[2]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[2]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 1.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        if (pBuilder == AEdgeMesh.g_pMeshBuilder) {
            this.m_aMeshData[3] = pBuilder.GetMeshData();
        }
    }
    BuildShadowMesh(pEdge, pBuilder) {
        let aPosition = [null, null, null];
        let aNormal = [null, null, null];
        let aTexUV = [null, null, null];
        aNormal[0] = { x: 0.0, y: 1.0, z: 0.0 };
        aNormal[1] = { x: 0.0, y: 1.0, z: 0.0 };
        aNormal[2] = { x: 0.0, y: 1.0, z: 0.0 };
        if (pBuilder == null) {
            pBuilder = AEdgeMesh.g_pMeshBuilder;
            pBuilder.Clear();
        }
        let pLeftPoint = pEdge.m_mLeftPoint.Object;
        let pRightPoint = pEdge.m_mRightPoint.Object;
        let mEdgeDir = Vector3.Sub(pRightPoint.m_mPosition, pLeftPoint.m_mPosition);
        let mNormal = Vector3.Cross(mEdgeDir, { x: 0.0, y: 1.0, z: 0.0 });
        let mDir1 = Vector3.Clone(mNormal);
        let mDir2 = Vector3.Clone(mNormal);
        let mDir4 = { x: -mNormal.x, y: -mNormal.y, z: -mNormal.z };
        let mDir5 = { x: -mNormal.x, y: -mNormal.y, z: -mNormal.z };
        let pLeftAdjoin = null;
        let pRightAdjoin = null;
        if (pLeftAdjoin != null) {
            let pLastAdjoin = pLeftAdjoin.m_mLastAdjoin.Object;
            let pNextAdjoin = pLeftAdjoin.m_mNextAdjoin.Object;
            if (pLastAdjoin != null) {
                let pLastAdjPoint = pLastAdjoin.m_mAdjPoint.Object;
                let mDivDir = Vector3.Add(Vector3.Normalize(mEdgeDir), Vector3.Normalize(Vector3.Sub(pLastAdjPoint.m_mPosition, pLeftPoint.m_mPosition)));
                let nLength = Vector3.Length(mDivDir);
                if (nLength != 0.0 && nLength < 1.90) {
                    mDir1 = Vector3.Clone(mDivDir);
                }
            }
            if (pNextAdjoin != null) {
                let pNextAdjPoint = pNextAdjoin.m_mAdjPoint.Object;
                let mDivDir = Vector3.Add(Vector3.Normalize(mEdgeDir), Vector3.Normalize(Vector3.Sub(pNextAdjPoint.m_mPosition, pLeftPoint.m_mPosition)));
                let nLength = Vector3.Length(mDivDir);
                if (nLength != 0.0 && nLength < 1.90) {
                    mDir5 = Vector3.Clone(mDivDir);
                }
            }
        }
        if (pRightAdjoin != null) {
            let pLastAdjoin = pRightAdjoin.m_mLastAdjoin.Object;
            let pNextAdjoin = pRightAdjoin.m_mNextAdjoin.Object;
            if (pLastAdjoin != null) {
                let pLastAdjPoint = pLastAdjoin.m_mAdjPoint.Object;
                let mDivDir = Vector3.Sub(Vector3.Normalize(Vector3.Sub(pLastAdjPoint.m_mPosition, pRightPoint.m_mPosition)), Vector3.Normalize(mEdgeDir));
                let nLength = Vector3.Length(mDivDir);
                if (nLength != 0.0 && nLength < 1.90) {
                    mDir4 = Vector3.Clone(mDivDir);
                }
            }
            if (pNextAdjoin != null) {
                let pNextAdjPoint = pNextAdjoin.m_mAdjPoint.Object;
                let mDivDir = Vector3.Sub(Vector3.Normalize(Vector3.Sub(pNextAdjPoint.m_mPosition, pRightPoint.m_mPosition)), Vector3.Normalize(mEdgeDir));
                let nLength = Vector3.Length(mDivDir);
                if (nLength != 0.0 && nLength < 1.90) {
                    mDir2 = Vector3.Clone(mDivDir);
                }
            }
        }
        let pSketch = pEdge.m_pSketch;
        let mPos1 = new Vector3(pSketch.m_aBottom[1].x, 0.005, pSketch.m_aBottom[1].z);
        let mPos2 = new Vector3(pSketch.m_aBottom[2].x, 0.005, pSketch.m_aBottom[2].z);
        let mPos4 = new Vector3(pSketch.m_aBottom[4].x, 0.005, pSketch.m_aBottom[4].z);
        let mPos5 = new Vector3(pSketch.m_aBottom[5].x, 0.005, pSketch.m_aBottom[5].z);
        let nPrj1 = Vector3.Dot(mNormal, mDir1);
        let nPrj2 = Vector3.Dot(mNormal, mDir2);
        let nPrj4 = Vector3.Dot({ x: -mNormal.x, y: -mNormal.y, z: -mNormal.z }, mDir4);
        let nPrj5 = Vector3.Dot({ x: -mNormal.x, y: -mNormal.y, z: -mNormal.z }, mDir5);
        let nScale1 = nPrj1 == 0 ? 5 : 0.15 / nPrj1;
        let nScale2 = nPrj2 == 0 ? 5 : 0.15 / nPrj2;
        let nScale4 = nPrj4 == 0 ? 5 : 0.15 / nPrj4;
        let nScale5 = nPrj5 == 0 ? 5 : 0.15 / nPrj5;
        let mPos11 = Vector3.Add(mPos1, Vector3.Scale(nScale1, mDir1));
        let mPos22 = Vector3.Add(mPos2, Vector3.Scale(nScale2, mDir2));
        let mPos44 = Vector3.Add(mPos4, Vector3.Scale(nScale4, mDir4));
        let mPos55 = Vector3.Add(mPos5, Vector3.Scale(nScale5, mDir5));
        aPosition[0] = Vector3.Clone(mPos1);
        aPosition[1] = Vector3.Clone(mPos11);
        aPosition[2] = Vector3.Clone(mPos22);
        aTexUV[0] = { x: 0.0, y: 1.0 };
        aTexUV[1] = { x: 0.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(mPos1);
        aPosition[1] = Vector3.Clone(mPos22);
        aPosition[2] = Vector3.Clone(mPos2);
        aTexUV[0] = { x: 0.0, y: 1.0 };
        aTexUV[1] = { x: 1.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(mPos55);
        aPosition[1] = Vector3.Clone(mPos5);
        aPosition[2] = Vector3.Clone(mPos4);
        aTexUV[0] = { x: 0.0, y: 0.0 };
        aTexUV[1] = { x: 0.0, y: 1.0 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(mPos55);
        aPosition[1] = Vector3.Clone(mPos4);
        aPosition[2] = Vector3.Clone(mPos44);
        aTexUV[0] = { x: 0.0, y: 0.0 };
        aTexUV[1] = { x: 1.0, y: 1.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        if (pBuilder == AEdgeMesh.g_pMeshBuilder) {
            this.m_aMeshData[4] = pBuilder.GetMeshData();
        }
    }
    MapTexture(nIndex) {
    }
}
AEdgeMesh.g_pMeshBuilder = null;
class AAreaMesh {
    constructor() {
        this.m_mInnerPoint = new Vector3(0.0, 0.0, 0.0);
        this.m_pBottomData = null;
        this.m_pBottomMesh = null;
    }
    version() {
        return 1000;
    }
    CreateGeometry(pBottomParent) {
        this.m_pBottomMesh = new GameObject("m_pBottomMesh", GameObjectType.Mesh);
        this.m_pBottomMesh.parent = pBottomParent;
        this.m_pBottomMesh.SetGeometry(this.m_pBottomData, new Material(MaterialType.AreaBottom));
        this.m_pBottomMesh.SetActive(true);
    }
    MapTexture(nIndex, pAttachment) {
        let pMesh = this.m_pBottomMesh;
        if (pAttachment != null) {
            let pTexture = pAttachment.entity;
            let pItem = pAttachment.menuItem.Object;
            if (pTexture != null && pItem != null) {
                ALinerDC.DC.m_pLayerMgr.m_pDelegateList.push(function () {
                    pItem.LoadAndSet(null, function (pValid) {
                        pTexture.scale = pTexture.textureSize;
                        pMesh.m_pMaterial.SetTexture(0, pTexture.texture);
                        pMesh.m_pMaterial.SetTextureOffset(0, new Vector2(0.0, 0.0));
                        pMesh.m_pMaterial.SetTextureScale(0, pTexture.scale);
                        pMesh.m_pMaterial.m_pMaterial.needsUpdate = true;
                    });
                });
                return;
            }
        }
        pMesh.m_pMaterial.SetTexture(0, null);
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mInnerPoint.x = pReader.ReadSingle();
        this.m_mInnerPoint.y = pReader.ReadSingle();
        this.m_mInnerPoint.z = pReader.ReadSingle();
        let nCount = pReader.ReadInt32();
        if (nCount > 0) {
            let pMeshData = new AMeshData();
            let pBuffer = null;
            nCount = pReader.ReadInt32();
            pMeshData.m_aPosition = new Float32Array(nCount * 3);
            for (let i = 0; i < nCount * 3; i++) {
                pMeshData.m_aPosition[i] = pReader.ReadSingle();
            }
            nCount = pReader.ReadInt32();
            pMeshData.m_aNormal = new Float32Array(nCount * 3);
            for (let i = 0; i < nCount * 3; i++) {
                pMeshData.m_aNormal[i] = pReader.ReadSingle();
            }
            nCount = pReader.ReadInt32();
            pMeshData.m_aTexUV = new Float32Array(nCount * 2);
            for (let i = 0; i < nCount * 2; i++) {
                pMeshData.m_aTexUV[i] = pReader.ReadSingle();
            }
            this.m_pBottomData = pMeshData;
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AAreaMesh.UnSerialize(): Bad end!");
        }
    }
    CollideBottom(mPoint) {
        mPoint.y = 0.0;
        let aPosition = [null, null, null];
        let nIndex = 0;
        for (let i = 0; i < this.m_pBottomData.m_aPosition.length / 3; i++) {
            let j = i * 3;
            aPosition[nIndex] = new Vector3(this.m_pBottomData.m_aPosition[j], 0.0, this.m_pBottomData.m_aPosition[j + 2]);
            nIndex++;
            if (3 == nIndex) {
                let s = this.CalTriangleArea(aPosition[0], aPosition[1], aPosition[2]);
                let sa = this.CalTriangleArea(aPosition[0], aPosition[1], mPoint);
                let sb = this.CalTriangleArea(aPosition[1], aPosition[2], mPoint);
                let sc = this.CalTriangleArea(aPosition[2], aPosition[0], mPoint);
                if (Math.abs(s - (sa + sb + sc)) < 0.0001) {
                    return true;
                }
                nIndex = 0;
            }
        }
        return false;
    }
    CalTriangleArea(pa, pb, pc) {
        return Math.abs((pa.x * pb.z + pb.x * pc.z + pc.x * pa.z - pb.x * pa.z - pc.x * pb.z - pa.x * pc.z) / 2.0);
    }
}
class AAreaLabel {
    constructor() {
        this.m_pName = "";
        this.m_mPosition = new Vector3(0.0, 0.0, 0.0);
        this.m_mBottomTexture = new Handle(Attachment, 0);
        this.m_mTopTexture = new Handle(Attachment, 0);
        this.m_pArea = null;
        this.m_mFloor = new Handle(Attachment, 0);
    }
    version() {
        return 1000 + 1;
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_pName = pReader.ReadString();
        this.m_mPosition.x = pReader.ReadSingle();
        this.m_mPosition.y = pReader.ReadSingle();
        this.m_mPosition.z = pReader.ReadSingle();
        this.m_mBottomTexture.Number = pReader.ReadUInt32();
        this.m_mTopTexture.Number = pReader.ReadUInt32();
        if (nVersion > 1000) {
            let nFlag = pReader.ReadInt32();
            if (nFlag > 0) {
                this.m_pArea = new AAreaMesh();
                this.m_pArea.UnSerialize(pReader);
            }
        }
        if (nVersion > 1001) {
            let bHaveSaveViewState = pReader.ReadBoolean();
            if (bHaveSaveViewState) {
                let pViewState = new CameraState();
                pViewState.UnSerialize(pReader);
            }
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AAreaLabel.UnSerialize(): Bad end!");
        }
    }
}
class ALinerDC {
    constructor(nIndex, pReader) {
        this.m_pLayerMgr = null;
        this.m_mTempPointHeap = null;
        this.m_mTempAdjoinHeap = null;
        this.m_mTempEdgeHeap = null;
        let pThis = this;
        this.m_pLayerMgr = new ALinerMgr(nIndex);
        this.m_mTempPointHeap = new HeapHandle(APoint, 255);
        this.m_mTempAdjoinHeap = new HeapHandle(AAdjoin, 255);
        this.m_mTempEdgeHeap = new HeapHandle(AEdge, 255);
        this.ResetTempHeap();
        if (pReader != null) {
            let pOldDC = ALinerDC.DC;
            ALinerDC.DC = this;
            this.UnSerialize(pReader);
            ALinerDC.DC = pOldDC;
        }
    }
    Update() {
    }
    OnGUI() {
    }
    OnViewModeChange() {
        this.m_pLayerMgr.FitViewMode();
    }
    ActiveLayer(nIndex) {
        this.ResetTempHeap();
        this.m_pLayerMgr.ActiveLayer(nIndex);
    }
    version() {
        return 1000;
    }
    Active(bActive) {
        if (bActive) {
            if (this.m_pLayerMgr.m_pSceneRoot == null) {
                this.m_pLayerMgr.BuildScene();
            }
        }
        this.m_pLayerMgr.Active(bActive);
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_pLayerMgr.UnSerialize(pReader);
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("ALinerDC.UnSerialize(): Bad end!");
        }
    }
    ResetTempHeap() {
        this.m_mTempPointHeap.InitHeap(null);
        this.m_mTempAdjoinHeap.InitHeap(null);
        this.m_mTempEdgeHeap.InitHeap(null);
    }
}
ALinerDC.DC = null;
class ALinerMgr {
    constructor(nWork) {
        this.m_nWork = 0;
        this.m_pSceneRoot = null;
        this.m_pLayerList = null;
        this.m_pDelegateList = null;
        this.m_pPlanMgr = null;
        this.m_nWork = nWork;
        this.m_pActiveLayer = null;
        this.m_pSceneRoot = null;
        this.m_pLayerList = new Array();
        this.m_pDelegateList = new Array();
    }
    version() {
        return 1000;
    }
    Active(bActive) {
        if (this.m_pSceneRoot != null) {
            this.m_pSceneRoot.SetActive(bActive);
        }
    }
    ActiveLayer(nIndex) {
        let pLayer = this.m_pLayerList[nIndex];
        if (this.m_pActiveLayer != null && this.m_pActiveLayer.m_pLayerRoot != null) {
            this.m_pActiveLayer.m_pLayerRoot.SetActive(false);
        }
        this.m_pActiveLayer = pLayer;
        if (this.m_pSceneRoot != null && this.m_pActiveLayer.m_pLayerRoot != null) {
            this.m_pActiveLayer.m_pLayerRoot.SetActive(true);
            this.FitViewMode();
        }
        if (this.m_pPlanMgr) {
            this.m_pPlanMgr.ActiveLayer(nIndex);
        }
    }
    GetLayer(nIndex) {
        if (nIndex < this.m_pLayerList.length) {
            return this.m_pLayerList[nIndex];
        }
        return null;
    }
    GetLayersLenth() {
        return this.m_pLayerList.length;
    }
    BuildScene() {
        console.warn("ALinerMgr.BuildScene(): Invalid.");
    }
    FitViewMode() {
        if (this.m_pSceneRoot != null && this.m_pActiveLayer != null) {
            this.m_pActiveLayer.m_pPatchRoot.SetActive(MiaokitDC.DC.viewMode == ViewMode.View2D);
        }
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        this.m_pSceneRoot = new GameObject("-ALiner Root", GameObjectType.Empty);
        this.m_pSceneRoot.parent = MiaokitDC.DC.GetWork(this.m_nWork).m_pWorkRoot;
        let nVersion = pReader.ReadUInt32();
        let nCount = pReader.ReadInt32();
        for (let i = 0; i < nCount; i++) {
            let pLayer = ALiner.Create(pReader);
            pLayer.m_nWork = this.m_nWork;
            pLayer.m_nIndex = i;
            pLayer.BuildScene(this.m_pSceneRoot);
            this.m_pLayerList.push(pLayer);
        }
        if (true && this.m_nWork == 2) {
            console.error("上海会展项目定制代码：平面图");
            let pThis = this;
            let pPlanMgr = new APlanMgr();
            pPlanMgr.Init("PlanMgr.json", this.m_pSceneRoot, function () {
                if (pThis.m_pActiveLayer) {
                    pPlanMgr.ActiveLayer(pThis.m_pActiveLayer.m_nIndex);
                }
                pThis.m_pPlanMgr = pPlanMgr;
            });
        }
        let pDelegateList = this.m_pDelegateList;
        MiaokitDC.DC.m_pAssetsLoader.PushDelegate(this.m_nWork, function () {
            for (let pDelegate of pDelegateList) {
                pDelegate();
            }
        });
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("ALinerMgr.UnSerialize(): Bad end!");
        }
    }
}
class ALiner {
    constructor() {
        this.m_mPointHeap = new HeapHandle(APoint, 0);
        this.m_mAdjoinHeap = new HeapHandle(AAdjoin, 0);
        this.m_mEdgeHeap = new HeapHandle(AEdge, 0);
        this.m_mMenuItemHeap = new HeapHandle(MenuItem, 0);
        this.m_mAttachmentHeap = new HeapHandle(Attachment, 0);
        this.m_pLabelList = new Array();
        this.m_pLayerRoot = null;
        this.m_pPointRoot = null;
        this.m_pPatchRoot = null;
        this.m_pEdgeRoot = null;
        this.m_pBottomRoot = null;
        this.m_pTopRoot = null;
        this.m_aEdgeMeshData = null;
        this.m_aEdgeMesh = null;
    }
    version() {
        return 1000;
    }
    Rebuild() {
        if (this.m_mMenuItemHeap.Count != 0) {
            for (let pItem of this.m_mMenuItemHeap) {
                if (MiaokitDC.DC.BindMenuType(pItem)) {
                    pItem.type.Add(pItem, this);
                }
                else {
                    pItem.type = MiaokitDC.DC.m_pCategories;
                    pItem.type.Add(pItem, this);
                }
                MiaokitDC.DC.m_pAssetsLoader.PushItem(pItem);
            }
        }
        if (this.m_mAttachmentHeap.Count != 0) {
            for (let pAttachment of this.m_mAttachmentHeap) {
                if (this.Construct(pAttachment) == null) {
                    pAttachment.valid = false;
                    console.warn("ALiner.Rebuild(): Construct(pAttachment) == null");
                }
            }
        }
    }
    Construct(pAttachment) {
        let pItem = pAttachment.menuItem.Object;
        if (pItem != null) {
            let pEntity = pAttachment.entity;
            if (pEntity != null) {
                switch (pEntity.collectionType) {
                    case CollectionType.ATexture:
                    case CollectionType.AHoleModel:
                    case CollectionType.AEdgeModel:
                        pEntity.desc = pItem.collectionDesc;
                        break;
                    default:
                        pAttachment = null;
                        alert("ALiner.Construct(): !pEntity.collectionType.");
                        break;
                }
                if (pAttachment != null) {
                    pItem.refCount++;
                }
                return pAttachment;
            }
            else {
                alert("ALiner.Construct(): pEntity == null.");
            }
        }
        else {
            alert("ALiner.Construct(): pItem == null.");
        }
        return null;
    }
    BuildScene(pSceneRoot) {
        if (pSceneRoot != null) {
            let pThis = this;
            this.m_pLayerRoot = new GameObject("--LayerRoot", GameObjectType.Empty);
            this.m_pPointRoot = new GameObject("--PointRoot", GameObjectType.Empty);
            this.m_pPatchRoot = new GameObject("--PatchRoot", GameObjectType.Empty);
            this.m_pEdgeRoot = new GameObject("---EdgeRoot", GameObjectType.Empty);
            this.m_pBottomRoot = new GameObject("---BottomRoot", GameObjectType.Empty);
            this.m_pTopRoot = new GameObject("---TopRoot", GameObjectType.Empty);
            this.m_pLayerRoot.parent = pSceneRoot;
            this.m_pPointRoot.parent = this.m_pLayerRoot;
            this.m_pPointRoot.position = new Vector3(0.0, 10.0, 0.0);
            this.m_pPatchRoot.parent = this.m_pLayerRoot;
            this.m_pPatchRoot.position = new Vector3(0.0, 10.0, 0.0);
            this.m_pEdgeRoot.parent = this.m_pLayerRoot;
            this.m_pBottomRoot.parent = this.m_pLayerRoot;
            this.m_pTopRoot.parent = this.m_pLayerRoot;
            this.m_pLayerRoot.SetActive(false);
            if (ALiner.g_aMeshBuilder == null) {
                ALiner.g_aMeshBuilder = [null, null, null, null, null];
                for (let i = 0; i < 5; i++) {
                    ALiner.g_aMeshBuilder[i] = new AMeshBuilder();
                }
            }
            for (let i = 0; i < 5; i++) {
                ALiner.g_aMeshBuilder[i].Clear();
            }
            let mEdgeList = this.m_mEdgeHeap.GetDefaultList();
            for (let pEdge of mEdgeList) {
                pEdge.CreateGeometry(this);
            }
            this.BuildEdgeMesh();
            for (let pArea of this.m_pLabelList) {
                if (pArea.m_pArea != null && pArea.m_pName != "delete") {
                    pArea.m_pArea.CreateGeometry(this.m_pBottomRoot);
                    pArea.m_pArea.MapTexture(0, pArea.m_mBottomTexture.Object);
                }
            }
            ALinerDC.DC.m_pLayerMgr.m_pDelegateList.push(function () {
                for (let pEdge of mEdgeList) {
                    if (pEdge.m_pMesh != null) {
                        pEdge.m_pMesh.PlaceHole(pThis.m_pEdgeRoot, pThis.m_pPatchRoot);
                    }
                }
            });
        }
    }
    BuildEdgeMesh() {
        if (this.m_aEdgeMeshData != null || this.m_aEdgeMesh != null) {
            alert("ALiner.BuildEdgeMesh(): this.m_aEdgeMeshData != null || this.m_aEdgeSubMesh != null.");
        }
        this.m_aEdgeMeshData = [null, null, null, null, null];
        this.m_aEdgeMesh = [null, null, null, null, null];
        let aMaterialType = [MaterialType.Edge, MaterialType.Edge, MaterialType.Border, MaterialType.Inborder, MaterialType.AreaBottomShadow];
        for (let i = 0; i < 5; i++) {
            this.m_aEdgeMeshData[i] = ALiner.g_aMeshBuilder[i].GetMeshData();
            this.m_aEdgeMesh[i] = new GameObject("Edge: " + i, GameObjectType.Mesh);
            this.m_aEdgeMesh[i].parent = this.m_pEdgeRoot;
            if (this.m_aEdgeMeshData[i] != null) {
                this.m_aEdgeMesh[i].SetGeometry(this.m_aEdgeMeshData[i], new Material(aMaterialType[i]));
                this.m_aEdgeMesh[i].SetActive(true);
            }
            else {
                this.m_aEdgeMesh[i].SetActive(false);
            }
            ALiner.g_aMeshBuilder[i].Clear();
        }
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mPointHeap.Number = pReader.ReadUInt32();
        this.m_mAdjoinHeap.Number = pReader.ReadUInt32();
        this.m_mEdgeHeap.Number = pReader.ReadUInt32();
        this.m_mMenuItemHeap.Number = pReader.ReadUInt32();
        this.m_mAttachmentHeap.Number = pReader.ReadUInt32();
        this.m_mPointHeap.InitHeap(pReader);
        this.m_mAdjoinHeap.InitHeap(pReader);
        this.m_mEdgeHeap.InitHeap(pReader);
        this.m_mMenuItemHeap.InitHeap(pReader);
        this.m_mAttachmentHeap.InitHeap(pReader);
        let nCount = pReader.ReadInt32();
        if (this.m_pLabelList == null) {
            this.m_pLabelList = new Array();
        }
        for (let i = 0; i < nCount; i++) {
            let pLabel = new AAreaLabel();
            pLabel.UnSerialize(pReader);
            this.m_pLabelList.push(pLabel);
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("ALiner.UnSerialize(): Bad end!");
        }
        this.Rebuild();
    }
    static Create(pReader = null) {
        let pLiner = new ALiner();
        if (pReader != null) {
            pLiner.UnSerialize(pReader);
        }
        else {
            pLiner.m_mPointHeap = new HeapHandle(APoint, 0);
            pLiner.m_mAdjoinHeap = new HeapHandle(AAdjoin, 0);
            pLiner.m_mEdgeHeap = new HeapHandle(AEdge, 0);
            pLiner.m_mMenuItemHeap = new HeapHandle(MenuItem, 0);
            pLiner.m_mAttachmentHeap = new HeapHandle(Attachment, 0);
            pLiner.m_mPointHeap.InitHeap();
            pLiner.m_mAdjoinHeap.InitHeap();
            pLiner.m_mEdgeHeap.InitHeap();
            pLiner.m_mMenuItemHeap.InitHeap();
            pLiner.m_mAttachmentHeap.InitHeap();
        }
        return pLiner;
    }
}
ALiner.g_aMeshBuilder = null;
class APlanMgr {
    constructor() {
        this.m_pObject = null;
        this.m_aPlan = [];
        this.m_pActivePlan = null;
    }
    Init(pFileName, pParent, pCallback) {
        let pThis = this;
        ALinerDC.DC.m_pLayerMgr.m_pDelegateList.push(function () {
            MiaokitDC.DC.m_pAssetsLoader.LoadModel(pFileName, function (pObject) {
                pThis.m_pObject = pObject;
                pThis.m_pObject.SetActive(true);
                pThis.m_pObject.SetParent(pParent, true);
                let pChildren = pThis.m_pObject.m_pObject.children;
                let nCount = pChildren.length;
                for (let i = 0; i < nCount; i++) {
                    if (pChildren[i].name.indexOf('F') > -1) {
                        let pPlan = new APlan(pChildren[i]);
                        pPlan.Active(false);
                        pThis.m_aPlan.push(pPlan);
                    }
                }
                pCallback();
            });
        });
    }
    ActiveLayer(nIndex) {
        if (this.m_pActivePlan) {
            this.m_pActivePlan.Active(false);
            this.m_pActivePlan = null;
        }
        this.m_pActivePlan = this.m_aPlan[nIndex];
        this.m_pActivePlan.Active(true);
    }
}
class APlan {
    constructor(pObject) {
        this.m_pObject = null;
        this.m_aTile = [];
        this.m_pActiveTile = null;
        this.m_pObject = pObject;
        let pChildren = pObject.children;
        let nCount = pChildren.length;
        for (let i = 0; i < nCount; i++) {
            this.m_aTile[i] = new ATile(pChildren[i]);
        }
    }
    Active(bActive) {
        this.m_pObject.visible = bActive;
    }
    Reset() {
        for (let pTile of this.m_aTile) {
            pTile.Show(1);
        }
    }
    HighLight(pName) {
        if (this.m_pActiveTile) {
            this.m_pActiveTile.Show(0);
            this.m_pActiveTile = null;
        }
        for (let pTile of this.m_aTile) {
            if (pTile.m_nName == pName) {
                this.m_pActiveTile = pTile;
                this.m_pActiveTile.Show(1);
                break;
            }
        }
    }
}
class ATile {
    constructor(pObject) {
        this.m_pObject = null;
        this.m_nName = "";
        this.m_pObject = pObject;
        this.m_nName = pObject.name;
    }
    Show(nType) {
        if (nType == 0) {
            this.m_pObject.material.color = new THREE.Color(0.5, 0.5, 0.5);
        }
        else {
            this.m_pObject.material.color = new THREE.Color(1.0, 1.0, 1.0);
        }
    }
}
var EntityType;
(function (EntityType) {
    EntityType[EntityType["Invalid"] = 0] = "Invalid";
    EntityType[EntityType["Group"] = 1] = "Group";
    EntityType[EntityType["Collection"] = 2] = "Collection";
    EntityType[EntityType["Component"] = 3] = "Component";
    EntityType[EntityType["Placeholder"] = 4] = "Placeholder";
})(EntityType || (EntityType = {}));
var CollectionType;
(function (CollectionType) {
    CollectionType[CollectionType["Invalid"] = 0] = "Invalid";
    CollectionType[CollectionType["ProjectFile"] = 1] = "ProjectFile";
    CollectionType[CollectionType["ATexture"] = 101] = "ATexture";
    CollectionType[CollectionType["AHoleModel"] = 102] = "AHoleModel";
    CollectionType[CollectionType["AEdgeModel"] = 103] = "AEdgeModel";
    CollectionType[CollectionType["ETexture"] = 201] = "ETexture";
    CollectionType[CollectionType["EBuildingModel"] = 202] = "EBuildingModel";
    CollectionType[CollectionType["EStoreyModel"] = 203] = "EStoreyModel";
    CollectionType[CollectionType["EFurnitureModel"] = 204] = "EFurnitureModel";
    CollectionType[CollectionType["EAssetsModel"] = 205] = "EAssetsModel";
    CollectionType[CollectionType["EPictureModel"] = 206] = "EPictureModel";
})(CollectionType || (CollectionType = {}));
var ComponentType;
(function (ComponentType) {
    ComponentType[ComponentType["Invalid"] = 0] = "Invalid";
    ComponentType[ComponentType["Panel"] = 1] = "Panel";
    ComponentType[ComponentType["Edge"] = 3] = "Edge";
    ComponentType[ComponentType["AreaBottom"] = 4] = "AreaBottom";
    ComponentType[ComponentType["AreaTop"] = 5] = "AreaTop";
})(ComponentType || (ComponentType = {}));
var DisplayType;
(function (DisplayType) {
    DisplayType[DisplayType["Normal"] = 0] = "Normal";
    DisplayType[DisplayType["Transparent"] = 1] = "Transparent";
    DisplayType[DisplayType["FrameModel"] = 2] = "FrameModel";
    DisplayType[DisplayType["Hide"] = 3] = "Hide";
})(DisplayType || (DisplayType = {}));
var GroupType;
(function (GroupType) {
    GroupType[GroupType["Invalid"] = 0] = "Invalid";
    GroupType[GroupType["Layer"] = 1] = "Layer";
    GroupType[GroupType["Area"] = 2] = "Area";
    GroupType[GroupType["Group"] = 3] = "Group";
})(GroupType || (GroupType = {}));
var ProgressState;
(function (ProgressState) {
    ProgressState[ProgressState["Preparing"] = 0] = "Preparing";
    ProgressState[ProgressState["Loading"] = 1] = "Loading";
    ProgressState[ProgressState["Processing"] = 2] = "Processing";
    ProgressState[ProgressState["Abort"] = 3] = "Abort";
    ProgressState[ProgressState["Exited"] = 4] = "Exited";
})(ProgressState || (ProgressState = {}));
class MenuType {
    constructor() {
        this.m_nID = 0;
        this.m_pName = null;
        this.m_pDesc = null;
        this.m_pIconUrl = null;
        this.m_pIcon = null;
    }
    get uiName() {
        return this.m_pName;
    }
    get uiDesc() {
        return this.m_pDesc;
    }
    get uiSprite() {
        return this.m_pIcon;
    }
    SetParent(pParent) {
        if (this.m_pParent != null) {
            alert("MenuType.SetParent(): m_pParent != null.");
            return;
        }
        this.m_pParent = pParent;
        if (this.m_pParent != null) {
            this.m_pParent.AddChild(this);
        }
    }
    AddChild(pChild) {
        if (pChild == null) {
            return;
        }
        if (this.m_pChildren == null) {
            this.m_pChildren = new Array();
        }
        this.m_pChildren.push(pChild);
    }
    Add(pItem, pHolder) {
        if (this.m_pElements == null) {
            this.m_pElements = new Array();
        }
        pItem.holder = pHolder;
        this.m_pElements.push(pItem);
    }
    Remove(pItem) {
        this.m_pElements.splice(this.m_pElements.indexOf(pItem), 1);
        if (this.m_pElements.length == 0) {
            this.m_pElements = null;
        }
    }
    Search(pItem, pHolder) {
        if (this.m_pElements != null) {
            for (let pCurItem of this.m_pElements) {
                if (pCurItem.id == pItem.id && pCurItem.holder == pHolder) {
                    return pCurItem;
                }
            }
        }
        return null;
    }
    Clear(pHolder) {
        if (this.m_pElements != null) {
            if (pHolder == null) {
                this.m_pElements = null;
            }
            else {
                let nIndex = 0;
                while (nIndex < this.m_pElements.length) {
                    if (this.m_pElements[nIndex].holder == pHolder) {
                        this.m_pElements.splice(nIndex, 1);
                    }
                    else {
                        nIndex++;
                    }
                }
                if (this.m_pElements.length == 0) {
                    this.m_pElements = null;
                }
            }
        }
    }
    get parent() {
        return this.m_pParent;
    }
    get children() {
        return this.m_pChildren;
    }
    get elements() {
        return this.m_pElements;
    }
}
class MenuItem {
    constructor() {
        this.m_mHandle = new Handle(MenuItem, 0);
        this.m_eCollectionType = CollectionType.Invalid;
        this.m_pCollectionDesc = null;
        this.m_pType = null;
        this.m_nLoading = 0;
        this.m_nRefCount = 0;
        this.m_pIcon = null;
        this.m_pAsyncList = null;
        this.m_pHolder = null;
    }
    get uiName() {
        return this.collectionDesc == null ? "未命名" : this.collectionDesc.name;
    }
    get uiDesc() {
        return this.collectionDesc == null ? "" : this.collectionDesc.desc;
    }
    get uiSprite() {
        return this.m_pIcon;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(MenuItem, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_eCollectionType = pReader.ReadInt32();
        let pDesc = MiaokitDC.DC.DescriptorFactory(this.m_eCollectionType);
        pDesc.UnSerialize(pReader);
        this.m_pCollectionDesc = pDesc;
        this.m_pType = null;
        this.m_nLoading = 0;
        this.m_nRefCount = 0;
        this.m_pIcon = null;
        this.m_pAsyncList = null;
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("MenuItem.UnSerialize(): Bad end!");
        }
    }
    Remap(mHeap) {
        this.m_mHandle.Heap = mHeap;
    }
    Init(eType, jData) {
        if (this.m_pCollectionDesc != null) {
            alert("MenuItem.Init(): m_pCollectionDesc != null.");
        }
        this.m_mHandle = new Handle(MenuItem, 0);
        this.m_eCollectionType = eType;
        let pDesc = MiaokitDC.DC.DescriptorFactory(this.m_eCollectionType);
        pDesc.Init(jData);
        this.m_pCollectionDesc = pDesc;
        this.m_pType = null;
        this.m_nLoading = 0;
        this.m_nRefCount = 0;
        this.m_pIcon = null;
        this.m_pAsyncList = null;
    }
    Reinit(pCallback) {
        pCallback(this);
    }
    LoadAndSet(pProgress, pCallback) {
        if (this.collectionDesc != null) {
            if (this.loading == 1) {
                if (pProgress != null) {
                    pProgress.state = ProgressState.Processing;
                }
                pCallback(this);
            }
            else if (this.loading == 0) {
                if (this.m_pAsyncList == null) {
                    if (pProgress != null) {
                        pProgress.state = ProgressState.Loading;
                    }
                    this.m_pAsyncList = new Array();
                    this.m_pAsyncList.push(new Delegate(pProgress, pCallback));
                    this.StartLoad(pProgress);
                }
                else {
                    if (pProgress != null) {
                        pProgress.loader = this.m_pAsyncList[0].m_pProgress.loader;
                        pProgress.state = ProgressState.Loading;
                    }
                    this.m_pAsyncList.push(new Delegate(pProgress, pCallback));
                }
            }
            else {
                if (pProgress != null) {
                    pProgress.state = ProgressState.Abort;
                }
                pCallback(null);
            }
        }
    }
    StartLoad(pProgress) {
        let pThis = this;
        this.collectionDesc.Load(pProgress, function (pError) {
            if (pError == null) {
                pThis.loading = 1;
                if (pThis.m_pAsyncList != null) {
                    for (let pDelegate of pThis.m_pAsyncList) {
                        if (pDelegate.m_pProgress != null) {
                            pDelegate.m_pProgress.state = ProgressState.Processing;
                        }
                        pDelegate.m_pCallback(pThis);
                    }
                }
                pThis.m_pAsyncList = null;
            }
            else {
                console.warn("MenuItem.LoadAndSet(): ", pError);
                pThis.loading = -1;
                if (pThis.m_pAsyncList != null) {
                    for (let pDelegate of pThis.m_pAsyncList) {
                        if (pDelegate.m_pProgress != null) {
                            pDelegate.m_pProgress.state = ProgressState.Abort;
                        }
                        pDelegate.m_pCallback(null);
                    }
                }
                pThis.m_pAsyncList = null;
            }
        });
    }
    Destroy() {
        this.m_mHandle.Destroy();
        if (this.collectionDesc != null) {
            this.collectionDesc.Destory();
        }
        if (this.type != null) {
            this.type.Remove(this);
        }
        this.m_nLoading = 0;
        this.m_nRefCount = 0;
        this.m_pIcon = null;
        this.m_pAsyncList = null;
    }
    get handle() {
        return this.m_mHandle;
    }
    get collectionType() {
        return this.m_eCollectionType;
    }
    get collectionDesc() {
        return this.m_pCollectionDesc;
    }
    get id() {
        return this.collectionDesc == null ? -1 : this.collectionDesc.id;
    }
    get typeId() {
        return this.collectionDesc == null ? -1 : this.collectionDesc.typeId;
    }
    iconUrl() {
        return this.collectionDesc == null ? "" : this.collectionDesc.iconUrl;
    }
    get type() {
        return this.m_pType;
    }
    set type(pType) {
        this.m_pType = pType;
    }
    get loading() {
        return this.m_nLoading;
    }
    set loading(nLoading) {
        this.m_nLoading = nLoading;
    }
    get refCount() {
        return this.m_nRefCount;
    }
    set refCount(nRefCount) {
        this.m_nRefCount = nRefCount;
        if (this.m_nRefCount == 0) {
            this.Destroy();
        }
    }
    get holder() {
        return this.m_pHolder;
    }
    set holder(pHolder) {
        this.m_pHolder = pHolder;
    }
}
MenuItem.g_pContext = new HeapContext(MenuItem);
class Attachment {
    constructor() {
        this.m_mHandle = new Handle(Attachment, 0);
        this.m_mMaster = new Handle(Attachment, 0);
        this.m_mParent = new Handle(Attachment, 0);
        this.m_mMenuItem = new Handle(MenuItem, 0);
        this.m_pEntity = null;
        this.m_pBinding = null;
        this.m_nFlags = 0;
        this.m_pName = null;
        this.m_nUserData = 0;
        this.m_pHook = null;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(Attachment, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mMaster.Number = pReader.ReadUInt32();
        this.m_mParent.Number = pReader.ReadUInt32();
        this.m_mMenuItem.Number = pReader.ReadUInt32();
        this.m_pBinding = pReader.ReadString();
        this.m_nFlags = pReader.ReadInt32();
        this.m_pName = pReader.ReadString();
        this.m_nUserData = pReader.ReadUInt32();
        this.valid = true;
        let eEntityType = pReader.ReadInt32();
        if (eEntityType == EntityType.Group) {
            let eGroupType = pReader.ReadInt32();
            this.m_pEntity = MiaokitDC.DC.GroupFactory(eGroupType);
            this.m_pEntity.UnSerialize(pReader);
        }
        else if (eEntityType == EntityType.Collection) {
            let eCollectionType = pReader.ReadInt32();
            this.m_pEntity = MiaokitDC.DC.CollectionFactory(eCollectionType, null);
            this.m_pEntity.UnSerialize(pReader);
        }
        else if (eEntityType == EntityType.Component) {
            let eComponentType = pReader.ReadInt32();
            this.m_pEntity = MiaokitDC.DC.ComponentFactory(eComponentType);
            this.m_pEntity.UnSerialize(pReader);
        }
        else {
            pReader.ReadInt32();
            this.m_pEntity = null;
            alert("Attachment.UnSerialize(): Invalid type!" + eEntityType);
        }
        if (pReader.ReadBoolean()) {
            let pCameraState = new CameraState();
            pCameraState.UnSerialize(pReader);
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("Attachment.UnSerialize(): Bad end!");
        }
    }
    get handle() {
        return this.m_mHandle;
    }
    get master() {
        return this.m_mMaster;
    }
    set master(pMaster) {
        this.m_mMaster.Number = pMaster.Number;
    }
    get parent() {
        return this.m_mParent;
    }
    set parent(pParent) {
        this.m_mParent.Number = pParent.Number;
        alert("此处未完全实现");
    }
    get menuItem() {
        return this.m_mMenuItem;
    }
    set menuItem(mMenuItem) {
        this.m_mMenuItem.Number = mMenuItem.Number;
    }
    get entityType() {
        return this.m_pEntity == null ? EntityType.Invalid : this.m_pEntity.type;
    }
    get entity() {
        return this.m_pEntity;
    }
    set entity(pEntity) {
        this.m_pEntity = pEntity;
    }
    get binding() {
        return this.m_pBinding == null ? "" : this.m_pBinding;
    }
    get valid() {
        return (this.m_nFlags & 0x1) > 0;
    }
    set valid(bFlag) {
        if (bFlag) {
            this.m_nFlags |= 0x1;
        }
        else {
            this.m_nFlags &= ~0x1;
        }
    }
    get active() {
        return (this.m_nFlags & 0x2) > 0;
    }
    set active(bFlag) {
        if (bFlag) {
            this.m_nFlags |= 0x2;
        }
        else {
            this.m_nFlags &= ~0x2;
        }
    }
    get enable() {
        return (this.m_nFlags & 0x4) > 0;
    }
    set enable(bFlag) {
        if (bFlag) {
            this.m_nFlags |= 0x4;
        }
        else {
            this.m_nFlags &= ~0x4;
        }
    }
    get builtin() {
        return (this.m_nFlags & 0x8) > 0;
    }
    set builtin(bFlag) {
        if (bFlag) {
            this.m_nFlags |= 0x8;
        }
        else {
            this.m_nFlags &= ~0x8;
        }
    }
    get lockTransform() {
        return (this.m_nFlags & 0x10) > 0;
    }
    set lockTransform(bFlag) {
        if (bFlag) {
            this.m_nFlags |= 0x10;
        }
        else {
            this.m_nFlags &= ~0x10;
        }
    }
    get name() {
        return this.m_pName;
    }
    set name(pName) {
        this.m_pName = pName;
    }
    get userData() {
        return this.m_nUserData;
    }
    set userData(nUserData) {
        this.m_nUserData = nUserData;
    }
    get hook() {
        return this.m_pHook;
    }
    set hook(pHook) {
        this.m_pHook = pHook;
        if (this.m_pHook != null) {
            this.m_pBinding = this.m_pHook.name;
        }
    }
}
Attachment.g_pContext = new HeapContext(Attachment);
class AssetsLoader {
    constructor() {
        this.m_pMenuItemList = null;
        this.m_pIconList = null;
        this.m_pDelegateList = null;
        this.m_pCache = null;
        this.m_pZipFile = null;
        this.m_pZipLoader = null;
        this.m_pProgressBar1 = null;
        this.m_pProgressBar2 = null;
        this.m_pProgressBar = null;
        this.m_nFlushRate = 0.0;
        this.m_nFlushScale = 0.0;
        this.m_pMenuItemList = new Array();
        this.m_pIconList = new Array();
        this.m_pDelegateList = new Array();
        this.m_pCache = new Array();
    }
    PushItem(pItem) {
        this.m_pMenuItemList.push(pItem);
    }
    PushIcon(pIcon) {
        this.m_pIconList.push(pIcon);
    }
    PushDelegate(nWork, pDelegate) {
        this.m_pDelegateList.push({ m_nWork: nWork, m_pDelegate: pDelegate });
    }
    Load(nIndex = 0) {
        let pThis = this;
        let nCount = pThis.m_pMenuItemList.length;
        if (nIndex == nCount) {
            pThis.Flush(true, 0.9, 0.1);
            let nCurWork = MiaokitDC.DC.m_nCurWork;
            for (let pDelegate of this.m_pDelegateList) {
                MiaokitDC.DC.SwitchWork(pDelegate.m_nWork);
                pDelegate.m_pDelegate();
            }
            this.Flush(false, 0.0, 0.0);
            Engine.g_pInstance.project.SwitchWorkForIndex(nCurWork);
            Engine.g_pInstance.project.ActiveFloor(0);
            pThis.m_pProgressBar = pThis.m_pProgressBar2;
            this.Load2(0);
            return;
        }
        pThis.Flush(true, 0.6 + nIndex / nCount * 0.3, 1.0 / nCount * 0.3);
        if (nIndex < nCount) {
            pThis.m_pMenuItemList[nIndex].LoadAndSet(null, function (pValid) {
                pThis.Load(nIndex + 1);
            });
        }
    }
    Load2(nIndex = 0) {
        let pThis = this;
        let nCount = pThis.m_pIconList.length;
        if (nIndex == nCount) {
            this.Flush(false, 0.0, 0.0);
            MiaokitDC.g_pScene.updateMatrixWorld(true);
            MiaokitDC.g_pScene.autoUpdate = false;
            return;
        }
        pThis.Flush(true, nIndex / nCount, 1.0 / nCount);
        if (nIndex < nCount) {
            pThis.m_pIconList[nIndex].Load(function () {
                pThis.Load2(nIndex + 1);
            });
        }
    }
    LoadModel(pUrl, pCallback) {
        let pThis = this;
        for (let pItem of pThis.m_pCache) {
            if (pUrl == pItem.m_pUrl) {
                pCallback(pItem.m_pObject);
                return;
            }
        }
        let pFile = pThis.m_pZipFile.file(pUrl);
        if (pFile != undefined && pFile != null) {
            pThis.m_pZipFile.file(pUrl).async("string").then(function success(data) {
                new THREE.ObjectLoader().parse(JSON.parse(data), function (pObject) {
                    let pModel = new GameObject("", GameObjectType.Model);
                    pModel.m_pObject = pObject;
                    pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: pModel });
                    pCallback(pModel);
                });
            }, function error(err) {
                console.info("AssetsLoader.LoadModel(): error.", pUrl);
                pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: null });
                pCallback(null);
            });
        }
        else {
            console.info("AssetsLoader.LoadModel(): pFile == null.", pUrl);
            pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: null });
            pCallback(null);
        }
    }
    LoadTexture(pUrl, pCallback) {
        let pThis = this;
        for (let pItem of pThis.m_pCache) {
            if (pUrl == pItem.m_pUrl) {
                pCallback(pItem.m_pObject);
                return;
            }
        }
        let pFile = pThis.m_pZipFile.file(pUrl);
        if (pFile != undefined && pFile != null) {
            pFile.async("base64").then(function success(bytes) {
                let pTexture = new THREE.Texture();
                let pImage = new Image();
                let pType = pUrl.substr(pUrl.lastIndexOf(".") + 1);
                pImage.src = "data:image/" + pType + ";base64," + bytes;
                pTexture.image = pImage;
                pTexture.format = (pType === "jpg" || pType === "jpeg") ? THREE.RGBFormat : THREE.RGBAFormat;
                pTexture.needsUpdate = true;
                pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: pTexture });
                pCallback(pTexture);
            }, function error(err) {
                console.info("AssetsLoader.LoadTexture(): error.", pUrl);
                pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: null });
                pCallback(null);
            });
        }
        else {
            console.info("AssetsLoader.LoadTexture(): pFile == null.", pUrl);
            pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: null });
            pCallback(null);
        }
    }
    LoadImage(pUrl, pCallback) {
        let pImage = new Image();
        pImage.crossOrigin = "Anonymous";
        pImage.onload = function () {
            let pTexture = new THREE.Texture();
            let pType = pUrl.substr(pUrl.lastIndexOf(".") + 1);
            pTexture.image = pImage;
            pTexture.format = (pType === "jpg" || pType === "jpeg") ? THREE.RGBFormat : THREE.RGBAFormat;
            pTexture.needsUpdate = true;
            pCallback(pTexture);
        };
        pImage.src = pUrl;
    }
    LoadIcon(pUrl, pCallback) {
        let pThis = this;
        for (let pItem of this.m_pCache) {
            if (pUrl == pItem.m_pUrl) {
                pCallback(pItem.m_pObject);
                return;
            }
        }
        if (true) {
            pThis.LoadImage(pUrl, function (pTexture) {
                if (pTexture != null) {
                    let pMaterial = new Material(MaterialType.Point);
                    pMaterial.SetTexture(0, pTexture);
                    pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: pMaterial });
                    pCallback(pMaterial);
                }
                else {
                    pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: null });
                    pCallback(null);
                }
            });
        }
        else {
        }
    }
    LoadProject(pUrl, pCallback) {
        let pThis = this;
        pThis.m_pProgressBar = pThis.m_pProgressBar1;
        pThis.LoadResources(function () {
            pThis.Flush(true, 0.4, 0.2);
            pThis.m_pZipFile.file("project.bin").async("arraybuffer").then(function success(data) {
                pThis.Flush(true, 0.45, 1.5);
                pCallback(data);
            }, function error(err) {
                pThis.Flush(true, 0.45, 1.5);
                pCallback(null);
            });
        });
    }
    LoadJson(pUrl, pCallback) {
        let pThis = this;
        let pFile = pThis.m_pZipFile.file(pUrl);
        if (pFile != undefined && pFile != null) {
            pThis.m_pZipFile.file(pUrl).async("string").then(function success(data) {
                pCallback(JSON.parse(data));
            }, function error(err) {
                console.info("AssetsLoader.LoadJson(): error.", pUrl);
                pCallback(null);
            });
        }
        else {
            console.info("AssetsLoader.LoadJson(): pFile == null.", pUrl);
            pCallback(null);
        }
    }
    LoadResources(pCallback) {
        let pThis = this;
        pThis.Flush(true, 0.0, 0.3);
        pThis.m_pZipLoader(function (pZip) {
            pThis.Flush(true, 0.3, 0.05);
            pThis.m_pZipFile = pZip;
            pThis.LoadTexture("lightmap.png", function (pTexture) {
                pThis.Flush(true, 0.35, 0.05);
                pTexture.wrapS = THREE.RepeatWrapping;
                pTexture.wrapT = THREE.RepeatWrapping;
                pTexture.repeat.set(1.0, -1.0);
                Material.g_aMaterial[1] = new THREE.MeshBasicMaterial({ map: pTexture });
                Material.g_aMaterial[3] = Material.g_aMaterial[1];
                pThis.LoadTexture("shadow.png", function (pTexture) {
                    pTexture.wrapS = THREE.RepeatWrapping;
                    pTexture.wrapT = THREE.RepeatWrapping;
                    pTexture.repeat.set(1.0, 1.0);
                    Material.g_aMaterial[5] = new THREE.MeshBasicMaterial({ map: pTexture, opacity: 0.5 });
                    Material.g_aMaterial[5].transparent = true;
                    Material.g_aMaterial[0] = new THREE.MeshBasicMaterial();
                    Material.g_aMaterial[2] = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
                    Material.g_aMaterial[4] = new THREE.MeshBasicMaterial({ color: 0xFAFAFA, map: null });
                    Material.g_aMaterial[6] = new THREE.MeshBasicMaterial({ color: 0x006699, side: THREE.DoubleSide });
                    Material.g_aMaterial[7] = new THREE.PointsMaterial({ size: 16, sizeAttenuation: false, map: null, alphaTest: 0.0, transparent: true });
                    pCallback();
                });
            });
        });
    }
    Flush(bShow, nRate, nScale) {
        this.m_nFlushRate = nRate;
        this.m_nFlushScale = nScale;
        this.m_pProgressBar(bShow, nRate);
    }
    FlushRate(pXhr) {
        this.m_pProgressBar(true, this.m_nFlushRate + this.m_nFlushScale * pXhr.loaded / pXhr.total);
    }
}
class Delegate {
    constructor(pProgress, pCallback) {
        this.m_pProgress = null;
        this.m_pCallback = null;
        this.m_pProgress = pProgress;
        this.m_pCallback = pCallback;
    }
}
class CameraState {
    constructor() {
        this.m_mPerspectPos = new Vector3(0.0, 0.0, 0.0);
        this.m_nVRotated = 0.0;
        this.m_nHRotated = 0.0;
        this.m_nForwardMoved = 0.0;
        this.m_mOrthoPos = new Vector3(0.0, 0.0, 0.0);
        this.m_nOrthoScaled = 0.0;
        this.m_nZRotated = 0.0;
    }
    get version() {
        return 1000;
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mPerspectPos.x = pReader.ReadSingle();
        this.m_mPerspectPos.y = pReader.ReadSingle();
        this.m_mPerspectPos.z = pReader.ReadSingle();
        this.m_nVRotated = pReader.ReadSingle();
        this.m_nHRotated = pReader.ReadSingle();
        this.m_mOrthoPos.x = pReader.ReadSingle();
        this.m_mOrthoPos.y = pReader.ReadSingle();
        this.m_mOrthoPos.z = pReader.ReadSingle();
        this.m_nOrthoScaled = pReader.ReadSingle();
        this.m_nZRotated = pReader.ReadSingle();
        this.m_nForwardMoved = pReader.ReadSingle();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("CameraCtrl.Config.UnSerialize(): Bad end!");
        }
    }
}
class Hook {
    constructor(pObject) {
        this.m_pObject = null;
        this.m_pAttachment = null;
        this.m_pObject = pObject;
    }
    SetLayer() {
    }
    get name() {
        return this.gameObject.name;
    }
    get gameObject() {
        return this.m_pObject;
    }
    get attachment() {
        return this.m_pAttachment;
    }
    set attachment(pAttachment) {
        this.m_pAttachment = pAttachment;
    }
    static LayerEnumToLayer(eType) {
        return eType - LayerType.Invalid;
    }
    static EntityEnumToLayer(eType) {
        let eLayer = LayerType.Invalid;
        switch (eType) {
            case CollectionType.AHoleModel:
                eLayer = LayerType.AHoleModel;
                break;
            case CollectionType.AEdgeModel:
                eLayer = LayerType.AEdgeModel;
                break;
            case CollectionType.EBuildingModel:
                eLayer = LayerType.EBuildingModel;
                break;
            case CollectionType.EStoreyModel:
                eLayer = LayerType.EStoreyModel;
                break;
            case CollectionType.EFurnitureModel:
                eLayer = LayerType.EFurnitureModel;
                break;
            case CollectionType.EAssetsModel:
                eLayer = LayerType.EAssetsModel;
                break;
            default:
                alert("Hook.EntityEnumToLayer(): !eType " + eType);
                break;
        }
        return this.LayerEnumToLayer(eLayer);
    }
    static EntityEnumToLayer2(eType) {
        let eLayer = LayerType.Invalid;
        switch (eType) {
            case ComponentType.Panel:
                eLayer = LayerType.EPanel;
                break;
            case ComponentType.Edge:
                eLayer = LayerType.AEdge;
                break;
            case ComponentType.AreaBottom:
                eLayer = LayerType.AAreaBottom;
                break;
            case ComponentType.AreaTop:
                eLayer = LayerType.AAreaTop;
                break;
            default:
                alert("Hook.EntityEnumToLayer(): !eType " + eType);
                break;
        }
        return this.LayerEnumToLayer(eLayer);
    }
    static LayerToEntityEnum(nLayer) {
        let eLayer = nLayer + LayerType.Invalid;
        let pOutput = { m_eEntity: 0, m_eType: 0 };
        switch (eLayer) {
            case LayerType.AEdge:
                pOutput.m_eEntity = EntityType.Component;
                pOutput.m_eType = ComponentType.Edge;
                break;
            case LayerType.AAreaBottom:
                pOutput.m_eEntity = EntityType.Component;
                pOutput.m_eType = ComponentType.AreaBottom;
                break;
            case LayerType.AAreaTop:
                pOutput.m_eEntity = EntityType.Component;
                pOutput.m_eType = ComponentType.AreaTop;
                break;
            case LayerType.AHoleModel:
                pOutput.m_eEntity = EntityType.Collection;
                pOutput.m_eType = CollectionType.AHoleModel;
                break;
            case LayerType.AEdgeModel:
                pOutput.m_eEntity = EntityType.Collection;
                pOutput.m_eType = CollectionType.AEdgeModel;
                break;
            case LayerType.EBuildingModel:
                pOutput.m_eEntity = EntityType.Collection;
                pOutput.m_eType = CollectionType.EBuildingModel;
                break;
            case LayerType.EStoreyModel:
                pOutput.m_eEntity = EntityType.Collection;
                pOutput.m_eType = CollectionType.EStoreyModel;
                break;
            case LayerType.EFurnitureModel:
                pOutput.m_eEntity = EntityType.Collection;
                pOutput.m_eType = CollectionType.EFurnitureModel;
                break;
            case LayerType.EAssetsModel:
                pOutput.m_eEntity = EntityType.Collection;
                pOutput.m_eType = CollectionType.EAssetsModel;
                break;
            case LayerType.EPanel:
                pOutput.m_eEntity = EntityType.Component;
                pOutput.m_eType = ComponentType.Panel;
                break;
            case LayerType.EGroup:
                pOutput.m_eEntity = EntityType.Group;
                pOutput.m_eType = GroupType.Group;
                break;
            case LayerType.EPlaceholder:
                pOutput.m_eEntity = EntityType.Placeholder;
                pOutput.m_eType = 0;
                break;
            default:
                break;
        }
        return pOutput;
    }
}
var LayerType;
(function (LayerType) {
    LayerType[LayerType["Invalid"] = -8] = "Invalid";
    LayerType[LayerType["Horizontal"] = 1] = "Horizontal";
    LayerType[LayerType["TransformCtrl"] = 2] = "TransformCtrl";
    LayerType[LayerType["AEdge"] = 3] = "AEdge";
    LayerType[LayerType["AAreaBottom"] = 4] = "AAreaBottom";
    LayerType[LayerType["AAreaTop"] = 5] = "AAreaTop";
    LayerType[LayerType["AHoleModel"] = 6] = "AHoleModel";
    LayerType[LayerType["AEdgeModel"] = 7] = "AEdgeModel";
    LayerType[LayerType["EBuildingModel"] = 8] = "EBuildingModel";
    LayerType[LayerType["EStoreyModel"] = 9] = "EStoreyModel";
    LayerType[LayerType["EFurnitureModel"] = 10] = "EFurnitureModel";
    LayerType[LayerType["EAssetsModel"] = 11] = "EAssetsModel";
    LayerType[LayerType["EPanel"] = 12] = "EPanel";
    LayerType[LayerType["EGroup"] = 13] = "EGroup";
    LayerType[LayerType["EPlaceholder"] = 14] = "EPlaceholder";
    LayerType[LayerType["ELayerBounds"] = 15] = "ELayerBounds";
    LayerType[LayerType["WarningBoard"] = 16] = "WarningBoard";
    LayerType[LayerType["EPictureModel"] = 17] = "EPictureModel";
})(LayerType || (LayerType = {}));
class MiaokitDC {
    constructor() {
        this.DescriptorFactory = null;
        this.GroupFactory = null;
        this.CollectionFactory = null;
        this.ComponentFactory = null;
        this.m_bEnabled = false;
        this.m_eViewMode = ViewMode.Invalid;
        this.m_nCurWork = 0;
        this.m_aWork = null;
        this.m_pWorkArr = [];
        this.m_aWorkData = null;
        this.m_pAssetsLoader = null;
        this.m_pNavigator = null;
        this.m_pCategories = null;
        this.m_pProjectRoot = null;
        this.m_pBaseUrl = "project/";
        this.m_pServerUrl = "http://115.28.168.123:8015/";
        this.m_pCategories = new MenuType();
        this.m_pProjectRoot = new GameObject("MiaokitDC", GameObjectType.Empty);
        this.m_pNavigator = new NNavigator();
        this.m_pAssetsLoader = new AssetsLoader();
        MiaokitDC.g_pScene.add(this.m_pProjectRoot.m_pObject);
    }
    Update() {
        NavChartDC.DC.Update();
        EyejiaDC.DC.Update();
    }
    InitWorks(aWorkData, pCallback) {
        if (this.m_bEnabled) {
            this.Reset();
            this.m_bEnabled = false;
        }
        this.m_aWorkData = aWorkData;
        this.m_aWork = new Array(256);
        for (let i = 0; i < 256; i++) {
            if (this.m_aWorkData[i] != null) {
                this.m_aWork[i] = new Work(i, this.m_aWorkData[i]);
                this.m_pWorkArr.push(this.m_aWork[i]);
            }
        }
        pCallback(null);
    }
    SwitchWork(nIndex) {
        if (this.m_aWork[nIndex] != null) {
            this.m_aWork[nIndex].Active();
            this.m_nCurWork = nIndex;
            this.m_bEnabled = true;
        }
        else {
            alert("MiaokitDC.SwitchWork(): m_aWork[nIndex] == null.");
        }
    }
    GetWork(nWork) {
        return this.m_aWork[nWork];
    }
    Reset() {
        for (let i = 0; i < 256; i++) {
            if (this.m_aWork[i] != null) {
                this.m_aWork[i].Destroy();
            }
            this.m_aWorkData[i] = null;
        }
        this.m_aWork = new Work[256];
        ALinerDC.DC = null;
        NavChartDC.DC = null;
        APoint.g_pContext.SwitchState(null);
        AAdjoin.g_pContext.SwitchState(null);
        AEdge.g_pContext.SwitchState(null);
        MenuItem.g_pContext.SwitchState(null);
        Attachment.g_pContext.SwitchState(null);
        NPoint.g_pContext.SwitchState(null);
        NAdjoin.g_pContext.SwitchState(null);
        NEdge.g_pContext.SwitchState(null);
        NLandmark.g_pContext.SwitchState(null);
        NavChart.g_pContext.SwitchState(null);
    }
    ActiveLayer(nIndex) {
        ALinerDC.DC.ActiveLayer(nIndex);
        NavChartDC.DC.ActiveLayer(nIndex);
        EyejiaDC.DC.ActiveLayer(nIndex);
    }
    BindMenuType(pItem) {
        return this.BindMenuType2(this.m_pCategories, pItem);
    }
    BindMenuType2(pType, pItem) {
        if (pType != null) {
            if (pItem.typeId == pType.m_nID) {
                pItem.type = pType;
                return true;
            }
            if (pType.children != null) {
                for (let pChild of pType.children) {
                    if (this.BindMenuType2(pChild, pItem)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    get viewMode() {
        return this.m_eViewMode;
    }
    set viewMode(eMode) {
        this.m_eViewMode = eMode;
        switch (eMode) {
            case ViewMode.View2D:
                Engine.g_pInstance.SetViewMode(0);
                break;
            case ViewMode.View3D:
                Engine.g_pInstance.SetViewMode(1);
                break;
        }
    }
}
MiaokitDC.g_pScene = null;
MiaokitDC.DC = null;
class Work {
    constructor(nIndex, aData) {
        this.m_pALinerDC = null;
        this.m_pEyejiaDC = null;
        this.m_pNavChartDC = null;
        this.m_pPointHeapState = null;
        this.m_pAdjoinHeapState = null;
        this.m_pEdgeHeapState = null;
        this.m_pMenuItemHeapState = null;
        this.m_pAttachmentHeapState = null;
        this.m_nIndex = 0;
        this.m_pID = null;
        this.m_aData = null;
        this.m_pWorkRoot = null;
        MiaokitDC.DC.m_aWork[nIndex] = this;
        this.m_pPointHeapState = APoint.g_pContext.SwitchState(null);
        this.m_pAdjoinHeapState = AAdjoin.g_pContext.SwitchState(null);
        this.m_pEdgeHeapState = AEdge.g_pContext.SwitchState(null);
        this.m_pMenuItemHeapState = MenuItem.g_pContext.SwitchState(null);
        this.m_pAttachmentHeapState = Attachment.g_pContext.SwitchState(null);
        this.m_pID = "";
        this.m_nIndex = nIndex;
        this.m_aData = aData;
        this.m_pWorkRoot = new GameObject("Work " + nIndex, GameObjectType.Empty);
        this.m_pWorkRoot.parent = MiaokitDC.DC.m_pProjectRoot;
        if (this.m_aData == null) {
            this.m_pALinerDC = new ALinerDC(this.m_nIndex, null);
            this.m_pEyejiaDC = new EyejiaDC(this.m_nIndex, null);
            this.m_pNavChartDC = new NavChartDC(this.m_nIndex, null);
        }
        else {
            let pReader = new BinaryReader(this.m_aData);
            this.UnSerialize(pReader);
        }
        console.log("为路点绑定房间");
        for (let layer of this.m_pALinerDC.m_pLayerMgr.m_pLayerList) {
            for (let Label of layer.m_pLabelList) {
                for (let Landmark of this.m_pNavChartDC.m_pLayerMgr.GetLayer(layer.m_nIndex).m_mLandmarkList) {
                    if (Label.m_pArea == null || Landmark.m_mPoint == null) {
                        continue;
                    }
                    if (Label.m_pArea.CollideBottom(Landmark.m_mPoint.Object.m_mPosition)) {
                        Landmark.m_pAAreaLabel = Label;
                    }
                }
            }
        }
        this.m_pPointHeapState = APoint.g_pContext.SwitchState(this.m_pPointHeapState);
        this.m_pAdjoinHeapState = AAdjoin.g_pContext.SwitchState(this.m_pAdjoinHeapState);
        this.m_pEdgeHeapState = AEdge.g_pContext.SwitchState(this.m_pEdgeHeapState);
        this.m_pMenuItemHeapState = MenuItem.g_pContext.SwitchState(this.m_pMenuItemHeapState);
        this.m_pAttachmentHeapState = Attachment.g_pContext.SwitchState(this.m_pAttachmentHeapState);
    }
    version() {
        return 1000;
    }
    Update() {
    }
    Active() {
        if (ALinerDC.DC != null) {
            ALinerDC.DC.Active(false);
        }
        if (EyejiaDC.DC != null) {
            EyejiaDC.DC.Active(false);
        }
        if (NavChartDC.DC != null) {
            NavChartDC.DC.Active(false);
        }
        APoint.g_pContext.SwitchState(this.m_pPointHeapState);
        AAdjoin.g_pContext.SwitchState(this.m_pAdjoinHeapState);
        AEdge.g_pContext.SwitchState(this.m_pEdgeHeapState);
        MenuItem.g_pContext.SwitchState(this.m_pMenuItemHeapState);
        Attachment.g_pContext.SwitchState(this.m_pAttachmentHeapState);
        ALinerDC.DC = this.m_pALinerDC;
        EyejiaDC.DC = this.m_pEyejiaDC;
        NavChartDC.DC = this.m_pNavChartDC;
        ALinerDC.DC.Active(true);
        EyejiaDC.DC.Active(true);
        NavChartDC.DC.Active(true);
    }
    Destroy() {
        console.warn("Work.Destroy(): Invalid.");
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_pID = pReader.ReadString();
        while (true) {
            let nIndex = pReader.ReadInt32();
            let nNext = pReader.ReadInt64();
            switch (nIndex) {
                case 0:
                    break;
                case 1:
                    this.m_pALinerDC = new ALinerDC(this.m_nIndex, pReader);
                    break;
                case 2:
                    this.m_pNavChartDC = new NavChartDC(this.m_nIndex, pReader);
                    break;
                case 3:
                    this.m_pEyejiaDC = new EyejiaDC(this.m_nIndex, pReader);
                    break;
                default:
                    alert("Work.UnSerialize(): Invalid module." + nIndex);
                    return;
            }
            if (nIndex == 0 && nNext == 0xFFFFFFFF) {
                break;
            }
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("Work.UnSerialize(): Bad end!");
        }
    }
}
var ViewMode;
(function (ViewMode) {
    ViewMode[ViewMode["Invalid"] = 0] = "Invalid";
    ViewMode[ViewMode["View2D"] = 1] = "View2D";
    ViewMode[ViewMode["View3D"] = 2] = "View3D";
    ViewMode[ViewMode["Fps"] = 3] = "Fps";
})(ViewMode || (ViewMode = {}));
class BinaryWriter {
}
class BinaryReader {
    constructor(pBuffer) {
        this.m_pBuffer = null;
        this.m_pReader = null;
        this.m_nPosition = 0;
        this.m_pBuffer = pBuffer;
        this.m_pReader = new DataView(pBuffer);
        this.m_nPosition = 0;
    }
    set Position(nPosition) {
        this.m_nPosition = nPosition;
    }
    get Position() {
        return this.m_nPosition;
    }
    ReadBoolean() {
        let nValue = this.m_pReader.getInt8(this.m_nPosition);
        this.m_nPosition += 1;
        return nValue > 0;
    }
    ReadInt32() {
        let nValue = this.m_pReader.getInt32(this.m_nPosition, true);
        this.m_nPosition += 4;
        return nValue;
    }
    ReadUInt32() {
        let nValue = this.m_pReader.getUint32(this.m_nPosition, true);
        this.m_nPosition += 4;
        return nValue >>> 0;
    }
    ReadInt64() {
        let nValueL = this.ReadUInt32();
        let nValueH = this.ReadUInt32();
        if (nValueH == 0x7FFFFFFF && nValueL == 0xFFFFFFFF) {
            return 0xFFFFFFFF;
        }
        return (nValueH << 32) + nValueL;
    }
    ReadSingle() {
        let nValue = this.m_pReader.getFloat32(this.m_nPosition, true);
        this.m_nPosition += 4;
        return nValue;
    }
    ReadString() {
        let nCharNum = this.m_pReader.getUint8(this.m_nPosition);
        this.m_nPosition += 1;
        if (nCharNum > 128) {
            var nCharNum2 = this.m_pReader.getUint8(this.m_nPosition);
            this.m_nPosition += 1;
            nCharNum += nCharNum2 * 256;
        }
        var pCharArray = new Int8Array(this.m_pBuffer, this.m_nPosition, nCharNum);
        this.m_nPosition += nCharNum;
        return this.ByteToString(pCharArray);
    }
    ReadString2(nLength) {
        var pCharArray = new Int8Array(this.m_pBuffer, this.m_nPosition, nLength);
        this.m_nPosition += nLength;
        return this.ByteToString(pCharArray);
    }
    ReadBytes(nLength) {
        let pBuffer = this.m_pBuffer.slice(this.m_nPosition, this.m_nPosition + nLength);
        this.m_nPosition += nLength;
        return pBuffer;
    }
    ByteToString(pBytes) {
        let pString = "";
        for (var pos = 0; pos < pBytes.length;) {
            let nFlag = pBytes[pos];
            let nUnicode = 0;
            if ((nFlag >>> 7) === 0) {
                pString += String.fromCharCode(pBytes[pos]);
                pos += 1;
            }
            else if ((nFlag & 0xFC) === 0xFC) {
                nUnicode = (pBytes[pos] & 0x3) << 30;
                nUnicode |= (pBytes[pos + 1] & 0x3F) << 24;
                nUnicode |= (pBytes[pos + 2] & 0x3F) << 18;
                nUnicode |= (pBytes[pos + 3] & 0x3F) << 12;
                nUnicode |= (pBytes[pos + 4] & 0x3F) << 6;
                nUnicode |= (pBytes[pos + 5] & 0x3F);
                pString += String.fromCharCode(nUnicode);
                pos += 6;
            }
            else if ((nFlag & 0xF8) === 0xF8) {
                nUnicode = (pBytes[pos] & 0x7) << 24;
                nUnicode |= (pBytes[pos + 1] & 0x3F) << 18;
                nUnicode |= (pBytes[pos + 2] & 0x3F) << 12;
                nUnicode |= (pBytes[pos + 3] & 0x3F) << 6;
                nUnicode |= (pBytes[pos + 4] & 0x3F);
                pString += String.fromCharCode(nUnicode);
                pos += 5;
            }
            else if ((nFlag & 0xF0) === 0xF0) {
                nUnicode = (pBytes[pos] & 0xF) << 18;
                nUnicode |= (pBytes[pos + 1] & 0x3F) << 12;
                nUnicode |= (pBytes[pos + 2] & 0x3F) << 6;
                nUnicode |= (pBytes[pos + 3] & 0x3F);
                pString += String.fromCharCode(nUnicode);
                pos += 4;
            }
            else if ((nFlag & 0xE0) === 0xE0) {
                nUnicode = (pBytes[pos] & 0x1F) << 12;
                ;
                nUnicode |= (pBytes[pos + 1] & 0x3F) << 6;
                nUnicode |= (pBytes[pos + 2] & 0x3F);
                pString += String.fromCharCode(nUnicode);
                pos += 3;
            }
            else if ((nFlag & 0xC0) === 0xC0) {
                nUnicode = (pBytes[pos] & 0x3F) << 6;
                nUnicode |= (pBytes[pos + 1] & 0x3F);
                pString += String.fromCharCode(nUnicode);
                pos += 2;
            }
            else {
                pString += String.fromCharCode(pBytes[pos]);
                pos += 1;
            }
        }
        return pString;
    }
}
class GameObject {
    constructor(pName, eType) {
        this.m_nLayer = 0;
        this.m_pName = null;
        this.m_eType = GameObjectType.Empty;
        this.m_pObject = null;
        this.m_pMaterial = null;
        this.m_pHook = null;
        this.m_pName = pName;
        this.m_eType = eType;
        switch (eType) {
            case GameObjectType.Empty:
                this.m_pObject = new THREE.Group();
                break;
            case GameObjectType.Mesh:
                this.m_pObject = new THREE.Mesh();
                break;
            case GameObjectType.Model:
                this.m_pObject = null;
                break;
            case GameObjectType.Line:
                this.m_pObject = new THREE.Line();
                break;
            case GameObjectType.Point:
                this.m_pObject = new THREE.Points();
                break;
            default:
                alert("GameObject.constructor(): !eType.");
                break;
        }
        if (this.m_pObject != null) {
            this.m_pObject.name = this.m_pName;
            this.m_pObject.userData = this;
        }
    }
    SetActive(bActive) {
        this.m_pObject.visible = bActive;
    }
    Destroy() {
        if (this.m_pObject.parent != null) {
            return this.m_pObject.parent.remove(this.m_pObject);
        }
        this.m_pObject.userData = null;
        this.m_pObject = null;
        this.m_pMaterial = null;
    }
    SetGeometry(pMeshData, pMaterial) {
        let pGeometry = new THREE.BufferGeometry();
        pGeometry.addAttribute('position', new THREE.BufferAttribute(pMeshData.m_aPosition, 3));
        pGeometry.addAttribute('normal', new THREE.BufferAttribute(pMeshData.m_aNormal, 3));
        pGeometry.addAttribute('uv', new THREE.BufferAttribute(pMeshData.m_aTexUV, 2));
        this.m_pMaterial = pMaterial;
        this.m_pObject.geometry = pGeometry;
        this.m_pObject.material = pMaterial.m_pMaterial;
    }
    SetGeometry2(pGeometry, pMaterial) {
        this.m_pMaterial = pMaterial;
        this.m_pObject.geometry = pGeometry;
        this.m_pObject.material = pMaterial.m_pMaterial;
    }
    SetText(pText, pMaterial) {
        let pBuffer = new THREE.BufferGeometry();
        let pShapes = Material.g_pFont.generateShapes(pText, 0.5, 2);
        let pGeometry = new THREE.ShapeGeometry(pShapes);
        pGeometry.computeBoundingBox();
        let nMid = -0.5 * (pGeometry.boundingBox.max.x - pGeometry.boundingBox.min.x);
        pGeometry.translate(nMid, 0.0, 0.0);
        pBuffer.fromGeometry(pGeometry);
        this.m_pMaterial = pMaterial;
        this.m_pObject.geometry = pGeometry;
        this.m_pObject.material = pMaterial.m_pMaterial;
        this.m_pObject.rotateX(1.5708);
    }
    SetLine(aPoint) {
        let pGeometry = new THREE.Geometry();
        let pPointList = pGeometry.vertices;
        let pColorList = [];
        let pLastPoint = null;
        let pLength = 0.0;
        for (let pPoint of aPoint) {
            let pCurPoint = new THREE.Vector3(pPoint.x, 0.5, pPoint.z);
            if (pLastPoint != null) {
                pLength += pLastPoint.distanceTo(pCurPoint);
            }
            pLastPoint = pCurPoint;
            pPointList.push(pCurPoint);
        }
        for (let pPoint of aPoint) {
            let pColor = new THREE.Color(0xffffff);
            pColor.setHSL(0.3333 * (pLength - pPoint.x) / pLength, 1.0, 0.5);
            pColorList.push(pColor);
        }
        pGeometry.colors = pColorList;
        let pMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 1, linewidth: 20, vertexColors: THREE.VertexColors });
        this.m_pObject.geometry = pGeometry;
        this.m_pObject.material = pMaterial;
    }
    SetPoint(aPoint, pMaterial) {
        let pGeometry = new THREE.Geometry();
        pGeometry.vertices = aPoint;
        this.m_pMaterial = pMaterial;
        this.m_pObject.geometry = pGeometry;
        this.m_pObject.material = pMaterial.m_pMaterial;
        this.m_pObject.renderOrder = 999;
        this.m_pObject.onBeforeRender = function (renderer) { renderer.clearDepth(); };
    }
    AddHook() {
        if (this.m_pHook == null) {
            this.m_pHook = new Hook(this);
        }
        return this.m_pHook;
    }
    FindChild(pName) {
        let pChildren = this.m_pObject.children;
        let nCount = pChildren.length;
        for (let i = 0; i < nCount; i++) {
            let pChild = pChildren[i];
            let pType = typeof (this);
            if (pChild.name === pName) {
                if (pChild.userData == null || pType !== GameObject) {
                    let pObject = new GameObject("pName", GameObjectType.Model);
                    pObject.m_pObject = pChild;
                    pChild.userData = pObject;
                }
                return pChild.userData;
            }
        }
        return null;
    }
    CloneModel() {
        let pObject = new GameObject(this.name, this.m_eType);
        pObject.m_pObject = this.m_pObject.clone();
        pObject.m_pObject.name = this.m_pName;
        pObject.m_pObject.userData = pObject;
        pObject.m_pObject.needUpdate = true;
        return pObject;
    }
    SetParent(pParent, bStays) {
        if (pParent != null) {
            pParent.m_pObject.add(this.m_pObject);
        }
        else {
            if (this.m_pObject.parent != null) {
                this.m_pObject.parent.remove(this.m_pObject);
            }
        }
    }
    get name() {
        return this.m_pObject.name;
    }
    get layer() {
        return this.m_nLayer;
    }
    set layer(nLayer) {
        this.m_nLayer = nLayer;
    }
    get parent() {
        if (this.m_pObject.parent != null) {
            return this.m_pObject.parent.userData;
        }
        return null;
    }
    set parent(pParent) {
        if (pParent != null) {
            pParent.m_pObject.add(this.m_pObject);
        }
        else {
            if (this.m_pObject.parent) {
                this.m_pObject.parent.remove(this.m_pObject);
            }
        }
    }
    get position() {
        return new Vector3(this.m_pObject.position.x, this.m_pObject.position.y, this.m_pObject.position.z);
    }
    set position(mPosition) {
        this.m_pObject.position.set(mPosition.x, mPosition.y, mPosition.z);
    }
    get eulerAngles() {
        return new Vector3(this.m_pObject.rotation.x * 57.29578, this.m_pObject.rotation.y * 57.29578, this.m_pObject.rotation.z * 57.29578);
    }
    set eulerAngles(mAngles) {
        this.m_pObject.rotation.set(mAngles.x * 0.0174533, mAngles.y * 0.0174533, mAngles.z * 0.0174533);
    }
    get localScale() {
        return new Vector3(this.m_pObject.scale.x, this.m_pObject.scale.y, this.m_pObject.scale.z);
    }
    set localScale(mScale) {
        this.m_pObject.scale.set(mScale.x, mScale.y, mScale.z);
    }
}
class Material {
    constructor(eType) {
        this.m_pMaterial = null;
        this.m_aTexture = [null, null];
        switch (eType) {
            case MaterialType.Edge:
                this.m_pMaterial = Material.g_aMaterial[1];
                break;
            case MaterialType.Border:
                this.m_pMaterial = Material.g_aMaterial[2];
                break;
            case MaterialType.Inborder:
                this.m_pMaterial = Material.g_aMaterial[1];
                break;
            case MaterialType.AreaBottom:
                this.m_pMaterial = Material.g_aMaterial[4].clone();
                break;
            case MaterialType.AreaBottomShadow:
                this.m_pMaterial = Material.g_aMaterial[5];
                break;
            case MaterialType.Text:
                this.m_pMaterial = Material.g_aMaterial[6];
                break;
            case MaterialType.Point:
                this.m_pMaterial = Material.g_aMaterial[7].clone();
                break;
            default:
                alert("Material.constructor(): !eType.");
                this.m_pMaterial = Material.g_aMaterial[0];
                break;
        }
    }
    SetTexture(nIndex, pTexture) {
        if (nIndex == 0) {
            this.m_aTexture[0] = pTexture;
            this.m_pMaterial.map = pTexture;
        }
        else {
            this.m_aTexture[1] = pTexture;
            this.m_pMaterial.map = pTexture;
        }
    }
    SetTextureOffset(nIndex, mOffset) {
        if (nIndex == 0) {
            if (this.m_aTexture[0] != null) {
                this.m_aTexture[0].offset.set(mOffset.x, mOffset.y);
            }
        }
        else {
            if (this.m_aTexture[1] != null) {
                this.m_aTexture[1].offset.set(mOffset.x, mOffset.y);
            }
        }
    }
    SetTextureScale(nIndex, mScale) {
        if (nIndex == 0) {
            if (this.m_aTexture[0] != null) {
                this.m_aTexture[0].repeat.set(mScale.x, mScale.y);
            }
        }
        else {
            if (this.m_aTexture[1] != null) {
                this.m_aTexture[1].repeat.set(mScale.x, mScale.y);
            }
        }
    }
}
Material.g_aMaterial = [null, null, null, null, null, null, null, null];
Material.g_pFont = null;
var GameObjectType;
(function (GameObjectType) {
    GameObjectType[GameObjectType["Empty"] = 0] = "Empty";
    GameObjectType[GameObjectType["Mesh"] = 1] = "Mesh";
    GameObjectType[GameObjectType["Model"] = 2] = "Model";
    GameObjectType[GameObjectType["Line"] = 3] = "Line";
    GameObjectType[GameObjectType["Point"] = 4] = "Point";
})(GameObjectType || (GameObjectType = {}));
var MaterialType;
(function (MaterialType) {
    MaterialType[MaterialType["Default"] = 0] = "Default";
    MaterialType[MaterialType["Edge"] = 1] = "Edge";
    MaterialType[MaterialType["Border"] = 2] = "Border";
    MaterialType[MaterialType["Inborder"] = 3] = "Inborder";
    MaterialType[MaterialType["AreaBottom"] = 4] = "AreaBottom";
    MaterialType[MaterialType["AreaBottomShadow"] = 5] = "AreaBottomShadow";
    MaterialType[MaterialType["Text"] = 6] = "Text";
    MaterialType[MaterialType["Point"] = 7] = "Point";
})(MaterialType || (MaterialType = {}));
class Vector4 {
    constructor(x, y, z, w) {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        this.w = 0.0;
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
class Vector3 {
    constructor(x, y, z) {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static Cross(a, b) {
        let a_ = new THREE.Vector3(a.x, a.y, a.z);
        let b_ = new THREE.Vector3(b.x, b.y, b.z);
        let c_ = a_.cross(b_).normalize();
        return { x: c_.x, y: c_.y, z: c_.z };
    }
    static Dot(a, b) {
        let a_ = new THREE.Vector3(a.x, a.y, a.z);
        let b_ = new THREE.Vector3(b.x, b.y, b.z);
        return a_.dot(b_);
    }
    static Sub(a, b) {
        return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
    }
    static Add(a, b) {
        return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
    }
    static Scale(s, a) {
        return { x: a.x * s, y: a.y * s, z: a.z * s };
    }
    static Distance(a, b) {
        return (new THREE.Vector3(a.x, a.y, a.z)).distanceTo(new THREE.Vector3(b.x, b.y, b.z));
    }
    static Normalize(a) {
        let v = (new THREE.Vector3(a.x, a.y, a.z)).normalize();
        return { x: v.x, y: v.y, z: v.z };
    }
    static Length(a) {
        return (new THREE.Vector3(a.x, a.y, a.z)).length();
    }
    static Clone(a) {
        return { x: a.x, y: a.y, z: a.z };
    }
    static LerpVectors(a, b, lerp) {
        let v = new THREE.Vector3().lerpVectors(new THREE.Vector3(a.x, a.y, a.z), new THREE.Vector3(b.x, b.y, b.z), lerp);
        return { x: v.x, y: v.y, z: v.z };
    }
    static AngleTo(a, b) {
        let a_ = new THREE.Vector3(a.x, a.y, a.z);
        let b_ = new THREE.Vector3(b.x, b.y, b.z);
        return a_.angleTo(b_);
    }
}
class Vector2 {
    constructor(x, y) {
        this.x = 0.0;
        this.y = 0.0;
        this.x = x;
        this.y = y;
    }
    static Clone(a) {
        return { x: a.x, y: a.y };
    }
    static Sub(a, b) {
        return { x: a.x - b.x, y: a.y - b.y };
    }
    static AngleTo(a, b) {
        var x1 = a.x;
        var x2 = b.x;
        var y1 = a.y;
        var y2 = b.y;
        var epsilon = 1.0e-6;
        var nyPI = Math.acos(-1.0);
        var dist, dot, degree, angle;
        dist = Math.sqrt(x1 * x1 + y1 * y1);
        x1 /= dist;
        y1 /= dist;
        dist = Math.sqrt(x2 * x2 + y2 * y2);
        x2 /= dist;
        y2 /= dist;
        dot = x1 * x2 + y1 * y2;
        if (Math.abs(dot - 1.0) <= epsilon)
            angle = 0.0;
        else if (Math.abs(dot + 1.0) <= epsilon)
            angle = nyPI;
        else {
            var cross;
            angle = Math.acos(dot);
            cross = x1 * y2 - x2 * y1;
            if (cross < 0) {
                angle = 2 * nyPI - angle;
            }
        }
        degree = angle * 180.0 / nyPI;
        return degree;
    }
}
class Rect {
    constructor(x, y, width, height) {
        this.x = 0.0;
        this.y = 0.0;
        this.width = 0.0;
        this.height = 0.0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    static CrossArea(a, b) {
        if (a.x > b.x + b.width) {
            return 0.0;
        }
        if (a.x + a.width < b.x) {
            return 0.0;
        }
        if (a.y - a.height > b.y) {
            return 0.0;
        }
        if (a.y < b.y - b.height) {
            return 0.0;
        }
        let colInt = Math.abs(Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
        let rowInt = Math.abs(Math.min(a.y, b.y) - Math.max(a.y - a.height, b.y - b.height));
        return (colInt * rowInt);
    }
    static Clone(a) {
        return { x: a.x, y: a.y, width: a.width, height: a.height };
    }
}
class Mathf {
    static Sin(x) {
        return Math.sin(x);
    }
    static Cos(x) {
        return Math.cos(x);
    }
    static Lerp(a, b, t) {
        return THREE.Math.lerp(a, b, t);
    }
    static Clamp(v, min, max) {
        if (v > max) {
            return max;
        }
        if (v < min) {
            return min;
        }
        return v;
    }
}
class InitData {
}
class Engine {
    constructor() {
        this.m_pCameraCtrl = null;
        this.m_bActive = false;
        this.m_pRenderer = null;
        this.m_pScene = null;
        this.m_pCamera = null;
        this.m_pStats = null;
        this.m_pProject = null;
        this.m_nCavasScale = null;
        this.pTestText = "";
        this.pTestTextArr = [];
        this.nDisPointer = 0;
        this.index = 0;
        this.distanCount = 0;
        this.nArrowsAnimationOffet = 0;
        this.pPath = [];
        this.TextRectArr = [];
        this.pTouchNavPoint = null;
        this.m_pBluePos = null;
        if (Engine.g_pInstance != null) {
            alert("Engine.constructor(): Engine.g_pInstance != null.");
            return;
        }
        Engine.g_pInstance = this;
    }
    Init(pData) {
        this.m_pScene = new THREE.Scene();
        this.m_pScene.scale.z = -this.m_pScene.scale.z;
        this.m_pScene.background = new THREE.Color(0.9219, 0.8945, 0.8242);
        let pLight = new THREE.DirectionalLight(0xffffff, 0.5);
        pLight.position.set(-1.0, -1.0, 1.0);
        this.m_pScene.add(pLight);
        this.m_pScene.add(new THREE.AmbientLight(0xFFFFFF, 1.5));
        let pContainer = document.getElementById("webgl_container");
        this.m_pRenderer = new THREE.WebGLRenderer();
        this.m_pRenderer.setPixelRatio(window.devicePixelRatio);
        this.m_pRenderer.setSize(pData.nWidth, pData.nHeight);
        this.m_pRenderer.setFaceCulling(THREE.CullFaceFront, THREE.FrontFaceDirectionCCW);
        this.m_pRenderer.domElement.id = "Scene";
        this.m_pRenderer.domElement.style.top = "0rem";
        this.m_pRenderer.domElement.style.bottom = "0rem";
        this.m_pRenderer.domElement.style.left = "0rem";
        this.m_pRenderer.domElement.style.right = "0rem";
        this.m_pRenderer.domElement.style.position = "absolute";
        pContainer.appendChild(this.m_pRenderer.domElement);
        this.m_nCavasScale = new Vector2(Number.parseFloat(this.m_pRenderer.domElement.style.width.replace("px", "")) / this.m_pRenderer.domElement.width, Number.parseFloat(this.m_pRenderer.domElement.style.height.replace("px", "")) / this.m_pRenderer.domElement.height);
        this.m_pTextCanvas = document.createElement("canvas");
        this.m_pTextCanvas.height = this.m_pRenderer.domElement.height;
        this.m_pTextCanvas.width = this.m_pRenderer.domElement.width;
        this.m_pTextCanvas.style.height = this.m_pRenderer.domElement.style.height;
        this.m_pTextCanvas.style.width = this.m_pRenderer.domElement.style.width;
        this.m_pTextCanvas.style.top = "0rem";
        this.m_pTextCanvas.style.bottom = "0rem";
        this.m_pTextCanvas.style.left = "0rem";
        this.m_pTextCanvas.style.right = "0rem";
        this.m_pTextCanvas.style.position = "absolute";
        this.m_pTextCanvas.style.zIndex = "1";
        pContainer.appendChild(this.m_pTextCanvas);
        this.m_pCanvasContext = this.m_pTextCanvas.getContext('2d');
        this.m_pCanvasContext.font = "30px Arial";
        if (pData.pStats != null) {
            this.m_pStats = pData.pStats;
            this.m_pStats.dom.style.top = "2rem";
            this.m_pStats.dom.style.left = "2rem";
            this.m_pStats.dom.style.position = "absolute";
            pContainer.appendChild(this.m_pStats.dom);
        }
        MiaokitDC.g_pScene = this.m_pScene;
        this.m_pCameraCtrl = new CameraCtrl3(this.m_pTextCanvas);
        this.m_pProject = new Project();
        this.m_pProject.m_pFloorData = pData.pFloorData;
        MiaokitDC.DC.m_pNavigator.m_pSiteData = pData.pSiteData;
        MiaokitDC.DC.m_pAssetsLoader.m_pZipLoader = pData.pZipLoader;
        MiaokitDC.DC.m_pAssetsLoader.m_pProgressBar1 = pData.pUpdate1;
        MiaokitDC.DC.m_pAssetsLoader.m_pProgressBar2 = pData.pUpdate2;
        this.m_pLayerUpdate = pData.pLayerUpdate;
        this.m_pNavBack = pData.pNavBack;
        this.m_pOutWorkBack = pData.pOutWorkBack;
        this.m_pSwichViweModelBack = pData.pSwichViweModelBack;
        this.m_pChooseLayer = pData.pChooseLayer;
        this.m_pNoFindPath = pData.pNoFindPath;
        this.m_pCompass = pData.pCompass;
        this.m_pSetNavPoint = pData.pSetNavPoint;
        this.m_pChickTouchMove = pData.pChickTouchMove;
        this.m_pVoicePost = pData.pVoicePost;
        this.m_pMoviePost = pData.pMovie;
        this.m_pShowActiveLayer = pData.pShowActiveLayer;
        let pThis = this;
        pThis.m_pProject.InitProject("project/project.bin", function (pError) {
            pData.pCallback(pError);
            pData.pPostBlueToothList(pThis.m_pProject.GetBlueToothList());
        });
    }
    onclick() {
        console.log("dianjia sd");
    }
    Destroy() {
        this.m_pProject.Destroy();
    }
    Start() {
        if (!this.m_bActive) {
            this.m_bActive = true;
            this.m_pProject.Start();
            this.Update();
        }
    }
    Stop() {
        this.m_bActive = false;
        this.m_pProject.Stop();
    }
    Update() {
        let pThis = Engine.g_pInstance;
        if (pThis.m_pStats != null) {
            pThis.m_pStats.begin();
        }
        pThis.m_pCameraCtrl.Update();
        pThis.m_pProject.Update();
        pThis.CanvasUpdate();
        pThis.m_pRenderer.render(pThis.m_pScene, pThis.m_pCameraCtrl.m_pCamera);
        switch (pThis.m_pCameraCtrl.m_eViewMode) {
            case 0:
                pThis.m_pCompass(MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pEyejiaDC.m_pLayerMgr.m_pActiveLayer.m_nDirectionHR);
                break;
            case 1:
                pThis.m_pCompass(MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pEyejiaDC.m_pLayerMgr.m_pActiveLayer.m_nDirectionHR + pThis.m_pCameraCtrl.m_nRotatedH);
                break;
        }
        if (pThis.m_pStats != null) {
            pThis.m_pStats.end();
        }
        if (pThis.m_bActive) {
            requestAnimationFrame(pThis.Update);
        }
    }
    set camera(pCamera) {
        this.m_pCamera = pCamera;
    }
    get project() {
        return this.m_pProject;
    }
    get domElement() {
        return this.m_pRenderer.domElement;
    }
    SetViewMode(i) {
        this.m_pCameraCtrl.SwitchMode(i);
        this.m_pSwichViweModelBack(i);
    }
    CamTracking(pPos) {
        this.m_pCameraCtrl.Tracking(pPos);
    }
    SetViewState(pCameraState) {
        this.m_pCameraCtrl.SetViewState(pCameraState);
    }
    CanvasUpdate() {
        this.ClearText();
        this.FillText();
        this.UpdateNavigate();
        this.ArrowsAnimation();
        this.TouchNavPoint();
        this.CurPosUpdata();
        this.NavigatePointText();
    }
    test() {
        this.m_pCanvasContext.fillStyle = "#7c6160";
        this.m_pCanvasContext.font = "30px Arial";
        this.m_pCanvasContext.fillText("实时位置 ：" + this.pTestText, 90, 30);
    }
    test2() {
        this.m_pCanvasContext.fillStyle = "#7c6160";
        this.m_pCanvasContext.font = "30px Arial";
        this.m_pCanvasContext.fillText("感应到的蓝牙个数：" + this.pTestTextArr.length, 90, 30 * 2);
        if (this.pTestTextArr.length > 0) {
            let i = 0;
            for (let pt of this.pTestTextArr) {
                i++;
                this.m_pCanvasContext.fillText("测试 ：" + pt, 90, 30 * (i + 3));
            }
        }
    }
    ClearText() {
        this.m_pCanvasContext.clearRect(0, 0, this.m_pTextCanvas.width, this.m_pTextCanvas.height);
        this.TextRectArr = [];
    }
    UpdateNavigate() {
        let nPathIndex = 0;
        if (this.pPath != null)
            for (let pPath of this.pPath) {
                let nPosIndex = 0;
                if (pPath.m_nWork == MiaokitDC.DC.m_nCurWork && pPath.m_nLayer == ALinerDC.DC.m_pLayerMgr.m_pActiveLayer.m_nIndex) {
                    for (let pPos of pPath.m_aPath) {
                        let sencenpos = this.m_pCameraCtrl.WorldToScenePos(pPos);
                        if (nPosIndex == 0) {
                            this.m_pCanvasContext.beginPath();
                            this.m_pCanvasContext.moveTo(sencenpos.x, sencenpos.y);
                        }
                        else {
                            this.m_pCanvasContext.lineTo(sencenpos.x, sencenpos.y);
                        }
                        if (nPosIndex == pPath.m_aPath.length - 1) {
                            this.m_pCanvasContext.lineWidth = 30;
                            this.m_pCanvasContext.strokeStyle = "#13c768";
                            this.m_pCanvasContext.stroke();
                            this.m_pCanvasContext.closePath();
                            let pText = "";
                            if (nPathIndex == this.pPath.length - 1) {
                                pText = "到达终点:" + this.pPath[nPathIndex].m_pEndPoint.m_mLandmark.Object.m_pName;
                            }
                            else {
                                if (this.pPath[nPathIndex].m_nWork == 0 && this.pPath[nPathIndex + 1].m_nWork != 0) {
                                    pText = "从这里进入" + (MiaokitDC.DC.GetWork(this.pPath[nPathIndex + 1].m_nWork).m_pID);
                                }
                                if (this.pPath[nPathIndex + 1].m_nWork == 0 && this.pPath[nPathIndex].m_nWork != 0) {
                                    pText = "从这里出到" + (MiaokitDC.DC.GetWork(this.pPath[nPathIndex + 1].m_nWork).m_pID);
                                }
                                if (this.pPath[nPathIndex + 1].m_nWork != 0 && this.pPath[nPathIndex].m_nWork != 0 && this.pPath[nPathIndex + 1].m_nWork != this.pPath[nPathIndex].m_nWork) {
                                    pText = "从这里到达" + MiaokitDC.DC.GetWork(this.pPath[nPathIndex + 1].m_nWork).m_pID + ":" + this.pPath[nPathIndex + 1].m_pLayerName;
                                }
                                else {
                                    pText = "从这里到达" + this.pPath[nPathIndex + 1].m_pLayerName;
                                }
                            }
                            this.m_pCanvasContext.strokeStyle = '#13c768';
                            this.m_pCanvasContext.lineWidth = 4;
                            this.m_pCanvasContext.beginPath();
                            this.m_pCanvasContext.moveTo(sencenpos.x, sencenpos.y);
                            this.m_pCanvasContext.lineTo(sencenpos.x, sencenpos.y - 25);
                            this.m_pCanvasContext.closePath();
                            this.m_pCanvasContext.stroke();
                            this.m_pCanvasContext.lineWidth = 1;
                            this.m_pCanvasContext.beginPath();
                            this.m_pCanvasContext.arc(sencenpos.x, sencenpos.y, 10, 0, (360 / 180) * Math.PI, true);
                            this.m_pCanvasContext.closePath();
                            this.m_pCanvasContext.fillStyle = "#00bbfa";
                            this.m_pCanvasContext.fill();
                            this.m_pCanvasContext.stroke();
                            this.m_pCanvasContext.fillStyle = "#7c6160";
                            this.m_pCanvasContext.font = "36px Arial";
                            let width = this.m_pCanvasContext.measureText(pText).width;
                            this.m_pCanvasContext.beginPath();
                            this.m_pCanvasContext.moveTo(sencenpos.x - (width * 0.5 + 5), sencenpos.y - (20 + 5));
                            this.m_pCanvasContext.lineTo(sencenpos.x + (width * 0.5 + 5), sencenpos.y - (20 + 5));
                            this.m_pCanvasContext.lineTo(sencenpos.x + (width * 0.5 + 5), sencenpos.y - (80 + 5));
                            this.m_pCanvasContext.lineTo(sencenpos.x - (width * 0.5 + 5), sencenpos.y - (80 + 5));
                            this.m_pCanvasContext.lineTo(sencenpos.x - (width * 0.5 + 5), sencenpos.y - (20 + 5));
                            this.m_pCanvasContext.closePath();
                            this.m_pCanvasContext.fillStyle = "yellow";
                            this.m_pCanvasContext.lineWidth = 1;
                            this.m_pCanvasContext.strokeStyle = "#7c6160";
                            this.m_pCanvasContext.fill();
                            this.m_pCanvasContext.stroke();
                            this.m_pCanvasContext.fillStyle = "#7c6160";
                            this.m_pCanvasContext.fillText(pText, sencenpos.x - width * 0.5, sencenpos.y - 40);
                        }
                        nPosIndex++;
                    }
                }
                nPathIndex++;
            }
    }
    NavigatePointText() {
        let nPathIndex = 0;
        if (this.pPath != null)
            for (let pPath of this.pPath) {
                if (pPath.m_nWork == MiaokitDC.DC.m_nCurWork && pPath.m_nLayer == ALinerDC.DC.m_pLayerMgr.m_pActiveLayer.m_nIndex) {
                    let startpos = this.m_pCameraCtrl.WorldToScenePos(pPath.m_pStartPoint.m_mPosition);
                    let endpos = this.m_pCameraCtrl.WorldToScenePos(pPath.m_pEndPoint.m_mPosition);
                    let startText = pPath.m_pStartPoint.m_mLandmark.Object.m_pName;
                    let endText = "";
                    if (nPathIndex == this.pPath.length - 1) {
                        endText = "到达终点:" + this.pPath[nPathIndex].m_pEndPoint.m_mLandmark.Object.m_pName;
                    }
                    else {
                        if (this.pPath[nPathIndex].m_nWork == 0 && this.pPath[nPathIndex + 1].m_nWork != 0) {
                            endText = "从这里进入" + (MiaokitDC.DC.GetWork(this.pPath[nPathIndex + 1].m_nWork).m_pID);
                        }
                        if (this.pPath[nPathIndex + 1].m_nWork == 0 && this.pPath[nPathIndex].m_nWork != 0) {
                            endText = "从这里出到" + (MiaokitDC.DC.GetWork(this.pPath[nPathIndex + 1].m_nWork).m_pID);
                        }
                        if (this.pPath[nPathIndex + 1].m_nWork != 0 && this.pPath[nPathIndex].m_nWork != 0 && this.pPath[nPathIndex + 1].m_nWork != this.pPath[nPathIndex].m_nWork) {
                            endText = "从这里到达" + MiaokitDC.DC.GetWork(this.pPath[nPathIndex + 1].m_nWork).m_pID + ":" + this.pPath[nPathIndex + 1].m_pLayerName;
                        }
                        else {
                            endText = "从这里到达" + this.pPath[nPathIndex + 1].m_pLayerName;
                        }
                    }
                    this.m_pCanvasContext.strokeStyle = '#13c768';
                    this.m_pCanvasContext.lineWidth = 4;
                    this.m_pCanvasContext.beginPath();
                    this.m_pCanvasContext.moveTo(startpos.x, startpos.y);
                    this.m_pCanvasContext.lineTo(startpos.x, startpos.y - 25);
                    this.m_pCanvasContext.closePath();
                    this.m_pCanvasContext.stroke();
                    this.m_pCanvasContext.lineWidth = 1;
                    this.m_pCanvasContext.beginPath();
                    this.m_pCanvasContext.arc(startpos.x, startpos.y, 10, 0, (360 / 180) * Math.PI, true);
                    this.m_pCanvasContext.closePath();
                    this.m_pCanvasContext.fillStyle = "#00bbfa";
                    this.m_pCanvasContext.fill();
                    this.m_pCanvasContext.stroke();
                    this.m_pCanvasContext.fillStyle = "#7c6160";
                    this.m_pCanvasContext.font = "36px Arial";
                    let startWidth = this.m_pCanvasContext.measureText(startText).width;
                    this.m_pCanvasContext.beginPath();
                    this.m_pCanvasContext.moveTo(startpos.x - (startWidth * 0.5 + 5), startpos.y - (20 + 5));
                    this.m_pCanvasContext.lineTo(startpos.x + (startWidth * 0.5 + 5), startpos.y - (20 + 5));
                    this.m_pCanvasContext.lineTo(startpos.x + (startWidth * 0.5 + 5), startpos.y - (80 + 5));
                    this.m_pCanvasContext.lineTo(startpos.x - (startWidth * 0.5 + 5), startpos.y - (80 + 5));
                    this.m_pCanvasContext.lineTo(startpos.x - (startWidth * 0.5 + 5), startpos.y - (20 + 5));
                    this.m_pCanvasContext.closePath();
                    this.m_pCanvasContext.fillStyle = "yellow";
                    this.m_pCanvasContext.lineWidth = 1;
                    this.m_pCanvasContext.strokeStyle = "#7c6160";
                    this.m_pCanvasContext.fill();
                    this.m_pCanvasContext.stroke();
                    this.m_pCanvasContext.fillStyle = "#7c6160";
                    this.m_pCanvasContext.fillText(startText, startpos.x - startWidth * 0.5, startpos.y - 40);
                    this.m_pCanvasContext.strokeStyle = '#13c768';
                    this.m_pCanvasContext.lineWidth = 4;
                    this.m_pCanvasContext.beginPath();
                    this.m_pCanvasContext.moveTo(endpos.x, endpos.y);
                    this.m_pCanvasContext.lineTo(endpos.x, endpos.y - 25);
                    this.m_pCanvasContext.closePath();
                    this.m_pCanvasContext.stroke();
                    this.m_pCanvasContext.lineWidth = 1;
                    this.m_pCanvasContext.beginPath();
                    this.m_pCanvasContext.arc(endpos.x, endpos.y, 10, 0, (360 / 180) * Math.PI, true);
                    this.m_pCanvasContext.closePath();
                    this.m_pCanvasContext.fillStyle = "#00bbfa";
                    this.m_pCanvasContext.fill();
                    this.m_pCanvasContext.stroke();
                    this.m_pCanvasContext.fillStyle = "#7c6160";
                    this.m_pCanvasContext.font = "36px Arial";
                    let endWidth = this.m_pCanvasContext.measureText(endText).width;
                    this.m_pCanvasContext.beginPath();
                    this.m_pCanvasContext.moveTo(endpos.x - (endWidth * 0.5 + 5), endpos.y - (20 + 5));
                    this.m_pCanvasContext.lineTo(endpos.x + (endWidth * 0.5 + 5), endpos.y - (20 + 5));
                    this.m_pCanvasContext.lineTo(endpos.x + (endWidth * 0.5 + 5), endpos.y - (80 + 5));
                    this.m_pCanvasContext.lineTo(endpos.x - (endWidth * 0.5 + 5), endpos.y - (80 + 5));
                    this.m_pCanvasContext.lineTo(endpos.x - (endWidth * 0.5 + 5), endpos.y - (20 + 5));
                    this.m_pCanvasContext.closePath();
                    this.m_pCanvasContext.fillStyle = "yellow";
                    this.m_pCanvasContext.lineWidth = 1;
                    this.m_pCanvasContext.strokeStyle = "#7c6160";
                    this.m_pCanvasContext.fill();
                    this.m_pCanvasContext.stroke();
                    this.m_pCanvasContext.fillStyle = "#7c6160";
                    this.m_pCanvasContext.fillText(endText, endpos.x - endWidth * 0.5, endpos.y - 40);
                }
                nPathIndex++;
            }
    }
    ArrowsAnimation() {
        if (this.pPath.length > 0) {
            this.nArrowsAnimationOffet += 0.005 * this.m_pCameraCtrl.m_nDistance;
            let distan = 0.08 * this.m_pCameraCtrl.m_nDistance;
            if (this.nArrowsAnimationOffet > distan)
                this.nArrowsAnimationOffet = 0;
            let continie = true;
            for (let pPath of this.pPath) {
                let index = 0;
                if (pPath.m_nWork == MiaokitDC.DC.m_nCurWork && pPath.m_nLayer == ALinerDC.DC.m_pLayerMgr.m_pActiveLayer.m_nIndex)
                    while (continie) {
                        this.nDisPointer = distan * index + this.nArrowsAnimationOffet;
                        continie = this.PosOfDistan(this.nDisPointer, pPath);
                        index++;
                    }
                continie = true;
            }
        }
    }
    PosOfDistan(distan, path) {
        while (this.index < path.m_pPathPassage.length) {
            let Passage = path.m_pPathPassage[this.index];
            if (this.nDisPointer >= this.distanCount && this.nDisPointer <= this.distanCount + Passage.m_nDistan) {
                let lerp = (this.nDisPointer - this.distanCount + 0.03 * this.m_pCameraCtrl.m_nDistance) / Passage.m_nDistan;
                this.FillArrows(Vector3.LerpVectors(Passage.m_pStarPos, Passage.m_pEndPos, lerp), Passage.m_pStarPos);
                return true;
            }
            this.distanCount += Passage.m_nDistan;
            this.index++;
        }
        this.index = 0;
        this.distanCount = 0;
        return false;
    }
    FillText() {
        let pLayer = NavChartDC.DC.m_pLayerMgr.m_pActiveLayer;
        for (let pSite of pLayer.m_mLandmarkList) {
            if (pSite.m_nIconType < 1) {
                if (pSite.m_pName != null && pSite.m_pName != "位置点") {
                    let pText = pSite.m_pName;
                    let pWorldPos = pSite.m_mPoint.Object.m_mPosition;
                    this.FillTextText2(pText, pWorldPos);
                }
            }
        }
    }
    FillTextText2(pText, pWorldPos) {
        let widthPx = this.m_pCanvasContext.measureText(pText).width;
        let sencenpos = this.m_pCameraCtrl.WorldToScenePos(pWorldPos);
        if (sencenpos.z >= 1) {
            return;
        }
        if (this.m_pCameraCtrl.m_eViewMode == 0) {
            let pRect1 = new Rect(sencenpos.x + 10, sencenpos.y - 10, widthPx, 30);
            for (let pRect2 of this.TextRectArr) {
                let c = Rect.CrossArea(pRect1, pRect2);
                if (c > 5) {
                    return;
                }
            }
            this.TextRectArr.push(pRect1);
            this.m_pCanvasContext.fillStyle = "#7c6160";
            this.m_pCanvasContext.font = "30px Arial";
            this.m_pCanvasContext.fillText(pText, sencenpos.x + 10, sencenpos.y - 10);
            this.m_pCanvasContext.beginPath();
            this.m_pCanvasContext.arc(sencenpos.x, sencenpos.y, 6, 0, 360, false);
            this.m_pCanvasContext.fillStyle = "#00bbfa";
            ;
            this.m_pCanvasContext.fill();
            this.m_pCanvasContext.closePath();
            this.m_pCanvasContext.beginPath();
            this.m_pCanvasContext.moveTo(sencenpos.x, sencenpos.y);
            this.m_pCanvasContext.lineTo(sencenpos.x + 10 + widthPx, sencenpos.y);
            this.m_pCanvasContext.lineWidth = 2;
            this.m_pCanvasContext.strokeStyle = "#00bbfa";
            this.m_pCanvasContext.stroke();
            this.m_pCanvasContext.closePath();
        }
        else if (this.m_pCameraCtrl.m_eViewMode == 1) {
            let pRect1 = new Rect(sencenpos.x + 20, sencenpos.y - 30, widthPx, 30);
            for (let pRect2 of this.TextRectArr) {
                let c = Rect.CrossArea(pRect1, pRect2);
                if (c > 5) {
                    return;
                }
            }
            this.TextRectArr.push(pRect1);
            this.m_pCanvasContext.fillStyle = "#7c6160";
            this.m_pCanvasContext.font = "30px Arial";
            this.m_pCanvasContext.fillText(pText, sencenpos.x + 20, sencenpos.y - 30);
            this.m_pCanvasContext.beginPath();
            this.m_pCanvasContext.arc(sencenpos.x, sencenpos.y, 6, 0, 360, false);
            this.m_pCanvasContext.fillStyle = "#00bbfa";
            ;
            this.m_pCanvasContext.fill();
            this.m_pCanvasContext.closePath();
            this.m_pCanvasContext.beginPath();
            this.m_pCanvasContext.moveTo(sencenpos.x, sencenpos.y);
            this.m_pCanvasContext.lineTo(sencenpos.x + 20, sencenpos.y - 20);
            this.m_pCanvasContext.lineTo(sencenpos.x + 20 + widthPx, sencenpos.y - 20);
            this.m_pCanvasContext.lineWidth = 2;
            this.m_pCanvasContext.strokeStyle = "#00bbfa";
            this.m_pCanvasContext.stroke();
            this.m_pCanvasContext.closePath();
        }
    }
    FillArrows(arrows, end) {
        let side = 0.02 * this.m_pCameraCtrl.m_nDistance;
        let sideOffset = 1.5;
        let B = new Vector3(0, arrows.y, 0);
        let C = new Vector3(0, arrows.y, 0);
        let D = new Vector3(0, arrows.y, 0);
        let A1 = new Vector3(0, arrows.y, 0);
        let B1 = new Vector3(0, arrows.y, 0);
        let C1 = new Vector3(0, arrows.y, 0);
        let D1 = new Vector3(0, arrows.y, 0);
        if ((arrows.x - end.x) == 0) {
            if (arrows.z > end.z) {
                D.x = arrows.x;
                D.z = arrows.z - side;
                A1.x = arrows.x;
                A1.z = arrows.z - side * sideOffset;
                D1.x = arrows.x;
                D1.z = arrows.z - side - side * sideOffset;
            }
            else {
                D.x = arrows.x;
                D.z = arrows.z + side;
                A1.x = arrows.x;
                A1.z = arrows.z + side * sideOffset;
                D1.x = arrows.x;
                D1.z = arrows.z + side + side * sideOffset;
            }
        }
        else if ((arrows.z - end.z) == 0) {
            if (arrows.x > end.x) {
                D.x = arrows.x - side;
                D.z = arrows.z;
                A1.x = arrows.x - side * sideOffset;
                A1.z = arrows.z;
                D1.x = arrows.x - side - side * sideOffset;
                D1.z = arrows.z;
            }
            else {
                D.x = arrows.x + side;
                D.z = arrows.z;
                A1.x = arrows.x + side * sideOffset;
                A1.z = arrows.z;
                D1.x = arrows.x + side + side * sideOffset;
                D1.z = arrows.z;
            }
        }
        else {
            let k = (arrows.z - end.z) / (arrows.x - end.x);
            let L1 = Math.abs(Math.pow((Math.pow(arrows.x - end.x, 2) + Math.pow(arrows.z - end.z, 2)), 0.5));
            let L2 = side;
            let xL = L2 / L1 * (Math.abs(arrows.x - end.x));
            let zL = L2 / L1 * (Math.abs(arrows.z - end.z));
            if (arrows.z > end.z) {
                if (k > 0) {
                    D.x = arrows.x - xL;
                    D.z = arrows.z - zL;
                    A1.x = arrows.x - xL * sideOffset;
                    A1.z = arrows.z - zL * sideOffset;
                    D1.x = arrows.x - xL - xL * sideOffset;
                    D1.z = arrows.z - zL - zL * sideOffset;
                }
                else {
                    D.x = arrows.x + xL;
                    D.z = arrows.z - zL;
                    A1.x = arrows.x + xL * sideOffset;
                    A1.z = arrows.z - zL * sideOffset;
                    D1.x = arrows.x + xL + xL * sideOffset;
                    D1.z = arrows.z - zL - zL * sideOffset;
                }
            }
            else {
                if (k > 0) {
                    D.x = arrows.x + xL;
                    D.z = arrows.z + zL;
                    A1.x = arrows.x + xL * sideOffset;
                    A1.z = arrows.z + zL * sideOffset;
                    D1.x = arrows.x + xL + xL * sideOffset;
                    D1.z = arrows.z + zL + zL * sideOffset;
                }
                else {
                    D.x = arrows.x - xL;
                    D.z = arrows.z + zL;
                    A1.x = arrows.x - xL * sideOffset;
                    A1.z = arrows.z + zL * sideOffset;
                    D1.x = arrows.x - xL - xL * sideOffset;
                    D1.z = arrows.z + zL + zL * sideOffset;
                }
            }
        }
        B.x = (D.x - arrows.x) * Math.cos(2 * Math.PI / 360 * 45) - (D.z - arrows.z) * Math.sin(2 * Math.PI / 360 * 45) + arrows.x;
        B.z = (D.x - arrows.x) * Math.sin(2 * Math.PI / 360 * 45) + (D.z - arrows.z) * Math.cos(2 * Math.PI / 360 * 45) + arrows.z;
        C.x = (D.x - arrows.x) * Math.cos(-2 * Math.PI / 360 * 45) - (D.z - arrows.z) * Math.sin(-2 * Math.PI / 360 * 45) + arrows.x;
        C.z = (D.x - arrows.x) * Math.sin(-2 * Math.PI / 360 * 45) + (D.z - arrows.z) * Math.cos(-2 * Math.PI / 360 * 45) + arrows.z;
        B1.x = (D1.x - A1.x) * Math.cos(2 * Math.PI / 360 * 45) - (D1.z - A1.z) * Math.sin(2 * Math.PI / 360 * 45) + A1.x;
        B1.z = (D1.x - A1.x) * Math.sin(2 * Math.PI / 360 * 45) + (D1.z - A1.z) * Math.cos(2 * Math.PI / 360 * 45) + A1.z;
        C1.x = (D1.x - A1.x) * Math.cos(-2 * Math.PI / 360 * 45) - (D1.z - A1.z) * Math.sin(-2 * Math.PI / 360 * 45) + A1.x;
        C1.z = (D1.x - A1.x) * Math.sin(-2 * Math.PI / 360 * 45) + (D1.z - A1.z) * Math.cos(-2 * Math.PI / 360 * 45) + A1.z;
        let a = this.m_pCameraCtrl.WorldToScenePos(arrows);
        let b = this.m_pCameraCtrl.WorldToScenePos(B);
        let c = this.m_pCameraCtrl.WorldToScenePos(C);
        let a1 = this.m_pCameraCtrl.WorldToScenePos(A1);
        let b1 = this.m_pCameraCtrl.WorldToScenePos(B1);
        let c1 = this.m_pCameraCtrl.WorldToScenePos(C1);
        let d1 = this.m_pCameraCtrl.WorldToScenePos(D);
        this.m_pCanvasContext.beginPath();
        this.m_pCanvasContext.moveTo(a.x, a.y);
        this.m_pCanvasContext.lineTo(b.x, b.y);
        this.m_pCanvasContext.lineTo(b1.x, b1.y);
        this.m_pCanvasContext.lineTo(a1.x, a1.y);
        this.m_pCanvasContext.lineTo(c1.x, c1.y);
        this.m_pCanvasContext.lineTo(c.x, c.y);
        this.m_pCanvasContext.closePath();
        this.m_pCanvasContext.fillStyle = "#ffffff";
        this.m_pCanvasContext.fill();
    }
    TouchNavPoint() {
        if (this.pTouchNavPoint != null) {
            let a = this.m_pCameraCtrl.WorldToScenePos(this.pTouchNavPoint);
            this.m_pCanvasContext.beginPath();
            this.m_pCanvasContext.moveTo(a.x, a.y);
            this.m_pCanvasContext.lineTo(a.x - 25, a.y - 60);
            this.m_pCanvasContext.lineTo(a.x, a.y - 40);
            this.m_pCanvasContext.lineTo(a.x + 25, a.y - 60);
            this.m_pCanvasContext.closePath();
            this.m_pCanvasContext.fillStyle = "#53a3d8";
            this.m_pCanvasContext.fill();
        }
    }
    CurPosUpdata() {
        if (this.m_pBluePos != null) {
            if (MiaokitDC.DC.m_nCurWork == this.m_nBlueWorkID && EyejiaDC.DC.m_pLayerMgr.m_pActiveLayer.m_nIndex == this.m_nBlueLayerID) {
                let sencenpos = this.m_pCameraCtrl.WorldToScenePos(this.m_pBluePos);
                this.m_pCanvasContext.strokeStyle = 'black';
                this.m_pCanvasContext.lineWidth = 1;
                this.m_pCanvasContext.beginPath();
                this.m_pCanvasContext.arc(sencenpos.x, sencenpos.y, 30, 0, (360 / 180) * Math.PI, true);
                this.m_pCanvasContext.closePath();
                this.m_pCanvasContext.fillStyle = "red";
                this.m_pCanvasContext.fill();
                this.m_pCanvasContext.stroke();
            }
        }
    }
}
Engine.g_pInstance = null;
class CameraCtrl {
    constructor() {
        this.m_pCamera = null;
        this.m_pPerspective = null;
        this.m_pOrthographic = null;
        this.m_bEnabled = false;
        this.m_eViewMode = 0;
        this.m_mTarget = new THREE.Vector3(0.0, 0.0, 0.0);
        this.m_nForwardMove = 20.0;
        this.m_nForwardMoved = 20.0;
        this.m_nRightMove = 0.0;
        this.m_nRightMoved = 0.0;
        this.m_nUpMove = 0.0;
        this.m_nUpMoved = 0.0;
        this.m_nVRotate = 45.0;
        this.m_nVRotated = 40.0;
        this.m_nHRotate = 30.0;
        this.m_nHRotated = 30.0;
        this.m_nOrthoScale = 10.0;
        this.m_nOrthoScaled = 10.0;
        this.m_mOVMove = new THREE.Vector2(0.0, 0.0);
        this.m_mOVMoved = new THREE.Vector2(0.0, 0.0);
        this.m_nMinDis = 2.0;
        this.m_nMaxDis = 512.0;
        this.m_nMinVRotate = 5.0;
        this.m_nMaxVRotate = 85.0;
        this.m_nVRSensit = 20.0;
        this.m_nHRSensit = 20.0;
        this.m_nFTSensit = 70.0;
        this.m_nRTSensit = 1.0;
        this.m_nUTSensit = 1.0;
        this.m_nOVScaleSensit = 20.0;
        this.m_nOVMoveSensit = 10.0;
        this.m_nMinOVSize = 2.0;
        this.m_nMaxOVSize = 256.0;
    }
    Init() {
        this.m_pPerspective = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.3, 1000);
        this.m_pOrthographic = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.3, 1000);
        this.m_pCamera = this.m_pPerspective;
        this.m_eViewMode = 2;
        this.m_pCamera.position.set(0.0, 0.0, 0.0);
        this.m_pCamera.quaternion.setFromAxisAngle(new THREE.Vector3(0.0, 1.0, 0.0), 0.0);
        this.m_pCamera.translateZ(this.m_nForwardMoved);
        this.m_pCamera.translateZ(-this.m_nForwardMoved);
        this.m_pCamera.rotateOnAxis(new THREE.Vector3(1.0, 0.0, 0.0), THREE.Math.degToRad(-this.m_nVRotated));
        this.m_pCamera.updateMatrixWorld(true);
        this.m_pCamera.rotateOnAxis(this.m_pCamera.worldToLocal(new THREE.Vector3(0.0, 1.0, 0.0, 0.0)).normalize(), THREE.Math.degToRad(-this.m_nHRotated));
        this.m_pCamera.translateZ(this.m_nForwardMoved);
        this.m_bEnabled = true;
    }
    SwitchMode() {
        this.m_eViewMode = 1;
        if (this.m_eViewMode == 1) {
        }
        else if (this.m_eViewMode == 2) {
            this.m_pCamera = this.m_pPerspective;
            this.m_mTarget = new THREE.Vector3(this.m_mOVMoved.x, 0.0, this.m_mOVMoved.y);
            this.m_pCamera.position = this.m_mTarget.Clone();
            this.m_pCamera.rotation = new THREE.Quaternion();
            this.m_nForwardMove = this.m_nMinDis + (this.m_nOrthoScaled - this.m_nMinOVSize) / (this.m_nMaxOVSize - this.m_nMinOVSize) * (this.m_nMaxDis - this.m_nMinDis);
            this.m_nForwardMoved = this.m_nForwardMove - 2.5;
            this.m_nRightMove = 0.0;
            this.m_nRightMoved = 0.0;
            this.m_nUpMove = 0.0;
            this.m_nUpMoved = 0.0;
            this.m_nVRotate = 45.0;
            this.m_nVRotated = 40.0;
            this.m_nHRotate = 30.0;
            this.m_nHRotated = 30.0;
            this.m_nMinVRotate = 5.0;
            this.m_pCamera.translateZ(this.m_nForwardMoved);
            this.m_pCamera.translateZ(-this.m_nForwardMoved);
            this.m_pCamera.rotateOnAxis(new THREE.Vector3(1.0, 0.0, 0.0), THREE.Math.degToRad(-this.m_nVRotated));
            this.m_pCamera.updateMatrixWorld(true);
            this.m_pCamera.rotateOnAxis(this.m_pCamera.worldToLocal(new THREE.Vector3(0.0, 1.0, 0.0, 0.0)).normalize(), THREE.Math.degToRad(-this.m_nHRotated));
            this.m_pCamera.translateZ(this.m_nForwardMoved);
        }
    }
    Update() {
        this.UpdateTransform();
    }
    UpdateTransform() {
        if (this.m_eViewMode == 1) {
            this.m_nOrthoScaled = THREE.Math.lerp(this.m_nOrthoScaled, this.m_nOrthoScale, 0.1);
            this.m_mOVMoved = THREE.Vector2.lerpVectors(this.m_mOVMoved, this.m_mOVMove, 0.1);
            this.m_pCamera.setLens(this.m_nOrthoScaled);
            this.m_pCamera.position = new THREE.Vector3(this.m_mOVMoved.x, 128.0, this.m_mOVMoved.y);
        }
        else if (this.m_eViewMode == 2) {
            var nVROffset = (this.m_nVRotate - this.m_nVRotated) * 0.1;
            var nHROffset = (this.m_nHRotate - this.m_nHRotated) * 0.1;
            if (nVROffset > 0.01 || nVROffset < -0.01) {
                this.m_nVRotated += nVROffset;
                this.m_pCamera.translateZ(-this.m_nForwardMoved);
                this.m_pCamera.rotateOnAxis(new THREE.Vector3(1.0, 0.0, 0.0), THREE.Math.degToRad(-nVROffset));
                this.m_pCamera.translateZ(this.m_nForwardMoved);
            }
            if (nHROffset > 0.01 || nHROffset < -0.01) {
                this.m_nHRotated += nHROffset;
                this.m_pCamera.translateZ(-this.m_nForwardMoved);
                this.m_pCamera.updateMatrixWorld(true);
                this.m_pCamera.rotateOnAxis(this.m_pCamera.worldToLocal(new THREE.Vector4(0.0, 1.0, 0.0, 0.0)).normalize(), THREE.Math.degToRad(-nHROffset));
                this.m_pCamera.translateZ(this.m_nForwardMoved);
            }
            var nForwardOffset = (this.m_nForwardMove - this.m_nForwardMoved) * 0.1;
            if (nForwardOffset > 0.01 || nForwardOffset < -0.01) {
                this.m_nForwardMoved += nForwardOffset;
                this.m_pCamera.translateZ(-nForwardOffset);
            }
            var nRightOffset = (this.m_nRightMove - this.m_nRightMoved) * 0.1;
            if (nRightOffset > 0.01 || nRightOffset < -0.01) {
                this.m_nRightMoved += nRightOffset;
                this.m_pCamera.translateX(-nRightOffset);
            }
            var nUpOffset = (this.m_nUpMove - this.m_nUpMoved) * 0.1;
            if (nUpOffset > 0.01 || nUpOffset < -0.01) {
                this.m_nUpMoved += nUpOffset;
                this.m_pCamera.translateY(-nUpOffset);
            }
            if ((0.5 - this.m_pCamera.position.y) > 0.0) {
                this.m_pCamera.position.y = 0.5;
            }
        }
    }
    DoPinch(pEvent) {
        var nDelta = pEvent;
        if (this.m_bEnabled) {
            if (this.m_eViewMode == 1) {
            }
            else if (this.m_eViewMode == 2) {
                var nForwardFactor = THREE.Math.clamp((this.m_nMaxDis - this.m_nMinDis) / (this.m_nForwardMoved - this.m_nMinDis), 0.1, 1.0) * this.m_nFTSensit;
                this.m_nForwardMove -= nDelta * nForwardFactor;
                this.m_nForwardMove = THREE.Math.clamp(this.m_nForwardMove, this.m_nMinDis, this.m_nMaxDis);
            }
        }
    }
    DoDrag(pEvent) {
        var eButton = pEvent.eButton;
        var mDelta = pEvent.mDelta;
        if (this.m_bEnabled) {
            if (this.m_eViewMode == 1) {
                if (eButton == 1) {
                }
            }
            else if (this.m_eViewMode == 2) {
                if (eButton == 0) {
                    this.m_nVRotate -= mDelta.y * this.m_nVRSensit;
                    this.m_nHRotate += mDelta.x * this.m_nHRSensit;
                    this.m_nVRotate = this.m_nVRotate % 360.0;
                    this.m_nVRotate = THREE.Math.clamp(this.m_nVRotate, this.m_nMinVRotate, this.m_nMaxVRotate);
                }
                else if (eButton == 1) {
                    this.m_nRightMove += mDelta.x * this.m_nRTSensit;
                    this.m_nUpMove += mDelta.y * this.m_nUTSensit;
                }
            }
        }
    }
}
class CameraCtrl2 {
    constructor(dom) {
        this.m_pCamera = null;
        this.m_nHalfWidth = 0;
        this.m_nHalfHeight = 0;
        this.m_nRotateH = 0;
        this.m_nRotateV = 0;
        this.m_nRotatedH = 0;
        this.m_nRotatedV = 0;
        this.m_pCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.m_pCamera.position.z = 30;
        this.m_nHalfWidth = window.innerWidth / 2;
        this.m_nHalfHeight = window.innerHeight / 2;
        let pThis = this;
        dom.addEventListener("touchstart", function (event) {
            if (event.touches.length > 0) {
                event.preventDefault();
                let pPoint = event.touches[0];
                pThis.m_nRotateH = (pPoint.pageX - pThis.m_nHalfWidth) / pThis.m_nHalfWidth * 30.0;
                pThis.m_nRotateV = (pPoint.pageY - pThis.m_nHalfHeight) / pThis.m_nHalfHeight * 30.0;
            }
        }, false);
        dom.addEventListener("touchmove", function (event) {
            if (event.touches.length > 0) {
                event.preventDefault();
                let pPoint = event.touches[0];
                pThis.m_nRotateH = (pPoint.pageX - pThis.m_nHalfWidth) / pThis.m_nHalfWidth * 30.0;
                pThis.m_nRotateV = (pPoint.pageY - pThis.m_nHalfHeight) / pThis.m_nHalfHeight * 30.0;
            }
        }, false);
        dom.addEventListener("touchend", function (event) {
            event.preventDefault();
            pThis.m_nRotateH = 0.0;
            pThis.m_nRotateV = 0.0;
        }, false);
    }
    Update() {
        this.m_nRotatedH += (-this.m_nRotateH - this.m_nRotatedH) * 0.12;
        this.m_nRotatedV += (this.m_nRotateV + 60.0 - this.m_nRotatedV) * 0.12;
        this.m_pCamera.position.set(0.0, 0.0, 0.0);
        this.m_pCamera.rotation.set(0.0, 0.0, 0.0);
        this.m_pCamera.rotateOnAxis(new THREE.Vector3(1.0, 0.0, 0.0), THREE.Math.degToRad(-this.m_nRotatedV));
        this.m_pCamera.updateMatrixWorld(true);
        this.m_pCamera.rotateOnAxis(this.m_pCamera.worldToLocal(new THREE.Vector3(0.0, 1.0, 0.0)).normalize(), THREE.Math.degToRad(this.m_nRotatedH));
        this.m_pCamera.translateZ(30.0);
        this.m_pCamera.updateProjectionMatrix();
    }
}
class CameraCtrl3 {
    constructor(dom) {
        this.mCameraState = null;
        this.mPerspectPos = new Vector3(0.0, 0.0, 0.0);
        this.nRotateH = 0;
        this.nRotateV = 0;
        this.nForwardMoved = 0.0;
        this.mOrthoPos = new Vector3(0.0, 0.0, 0.0);
        this.nOrthoScaled = 0.0;
        this.nZRotated = 0.0;
        this.m_pCamera = null;
        this.m_pCameraP = null;
        this.m_pCameraO = null;
        this.m_nHalfWidth = 0;
        this.m_nHalfHeight = 0;
        this.m_nRotateH = 0;
        this.m_nRotateV = 0;
        this.m_nRotatedH = 0;
        this.m_nRotatedV = 0;
        this.m_nZoom = 0;
        this.m_nZoomd = 0;
        this.m_nZoomMin = 10;
        this.m_nZoomMax = 100;
        this.m_nDistance = 180;
        this.m_nDistanceMin = 5;
        this.m_nDistanceMax = 800;
        this.m_pModleArr = [];
        this.m_nHalfWidth = window.innerWidth / 2;
        this.m_nHalfHeight = window.innerHeight / 2;
        this.m_nMove = new THREE.Vector2(0, 0);
        this.m_nMoved = new THREE.Vector2(0, 0);
        this.m_pCameraP = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        this.m_pCameraP.updateMatrixWorld(true);
        this.m_pCameraP.updateProjectionMatrix();
        this.m_pTaget = new THREE.Object3D();
        this.m_pCameraO = new THREE.OrthographicCamera(-this.m_nHalfWidth / 50, this.m_nHalfWidth / 50, this.m_nHalfHeight / 50, -this.m_nHalfHeight / 50, 0.1, 5000);
        this.m_pCameraO.rotation.set(THREE.Math.degToRad(-90), 0.0, 0.0);
        this.SwitchMode(1);
        let pThis = this;
        let pTouchstartPos;
        let pTouchstartDistan;
        let isTwoTouch;
        let pTouchScentrePos;
        let pOffset;
        let pTemp;
        let pTime;
        let pClickPoint;
        dom.addEventListener("touchstart", function (event) {
            if (event.touches.length == 1) {
                let now = new Date();
                pTime = now.getTime();
                pClickPoint = event.touches[0];
            }
            if (event.touches.length > 0) {
                event.preventDefault();
                if (event.touches.length == 1) {
                    isTwoTouch = false;
                    pOffset = new THREE.Vector2(0, 0);
                    let pPoint = event.touches[0];
                    switch (pThis.m_eViewMode) {
                        case 0:
                            pTouchstartPos = new THREE.Vector2(pPoint.pageX, pPoint.pageY);
                            pThis.m_nMove = new THREE.Vector2(0, 0);
                            pThis.m_nMoved = new THREE.Vector2(0, 0);
                            break;
                        case 1:
                            pTouchstartPos = new THREE.Vector2(pPoint.pageX, pPoint.pageY);
                            pTemp = pTouchstartPos;
                            break;
                    }
                }
                if (event.touches.length == 2) {
                    isTwoTouch = true;
                    pTouchstartPos = new THREE.Vector2((event.touches[0].pageX + event.touches[1].pageX) / 2.0, (event.touches[0].pageY + event.touches[1].pageY) / 2.0);
                    pTouchScentrePos = pTouchstartPos;
                    pThis.m_nMove = new THREE.Vector2(0, 0);
                    pThis.m_nMoved = new THREE.Vector2(0, 0);
                    let p0 = new THREE.Vector2(event.touches[0].pageX, event.touches[0].pageY);
                    let p1 = new THREE.Vector2(event.touches[1].pageX, event.touches[1].pageY);
                    pTouchstartDistan = p0.distanceTo(p1);
                }
            }
        }, false);
        dom.addEventListener("touchmove", function (event) {
            if (event.touches.length == 1) {
                event.preventDefault();
                let pPoint = event.touches[0];
                switch (pThis.m_eViewMode) {
                    case 0:
                        if (isTwoTouch) {
                            pOffset = new THREE.Vector2(pPoint.pageX - pTouchScentrePos.x, pPoint.pageY - pTouchScentrePos.y);
                            isTwoTouch = false;
                        }
                        pThis.m_nMove = new THREE.Vector2(pPoint.pageX - pTouchstartPos.x - pOffset.x, pPoint.pageY - pTouchstartPos.y - pOffset.y);
                        break;
                    case 1:
                        if (!isTwoTouch) {
                            pThis.nRotateH = (pPoint.pageX - pTemp.x) * 0.6;
                            pThis.nRotateV = (pPoint.pageY - pTemp.y) * 0.6;
                            pTemp = new THREE.Vector2(pPoint.pageX, pPoint.pageY);
                        }
                        break;
                }
            }
            if (event.touches.length == 2) {
                pThis.nRotateH = 0.0;
                pThis.nRotateV = 0.0;
                event.preventDefault();
                let pPoint = new THREE.Vector2((event.touches[0].pageX + event.touches[1].pageX) / 2.0, (event.touches[0].pageY + event.touches[1].pageY) / 2.0);
                ;
                pTouchScentrePos = pPoint;
                pThis.m_nMove = new THREE.Vector2(pPoint.x - pTouchstartPos.x, pPoint.y - pTouchstartPos.y);
                let p0 = new THREE.Vector2(event.touches[0].pageX, event.touches[0].pageY);
                let p1 = new THREE.Vector2(event.touches[1].pageX, event.touches[1].pageY);
                let pTouchmoveDistan = p0.distanceTo(p1);
                pThis.m_nZoom = pTouchstartDistan - pTouchmoveDistan;
            }
            Engine.g_pInstance.m_pChickTouchMove();
        }, false);
        dom.addEventListener("touchend", function (event) {
            event.preventDefault();
            if (event.touches.length == 0) {
                let now = new Date();
                if (now.getTime() - pTime < 250) {
                    console.log("单击");
                    pThis.RayHouse(pClickPoint);
                    pThis.ray(pClickPoint);
                }
            }
            pThis.nRotateH = 0.0;
            pThis.nRotateV = 0.0;
            pThis.m_nZoomd = 0.0;
            pThis.m_nZoom = 0.0;
        }, false);
    }
    Update() {
        switch (this.m_eViewMode) {
            case 0:
                this.m_nMoved.x += (this.m_nMove.x - this.m_nMoved.x) * 0.12;
                this.m_nMoved.y += (this.m_nMove.y - this.m_nMoved.y) * 0.12;
                let nMoved = new THREE.Vector2((this.m_nMoved.x - this.m_nMove.x), (this.m_nMoved.y - this.m_nMove.y));
                this.m_pTaget.translateOnAxis(this.m_pTaget.worldToLocal(new THREE.Vector3(1.0, 0.0, 0.0)), nMoved.x / 200 * this.m_nDistance * 0.1);
                this.m_pTaget.translateOnAxis(this.m_pTaget.worldToLocal(new THREE.Vector3(0.0, 0.0, 1.0)), nMoved.y / 200 * this.m_nDistance * 0.1);
                this.m_pCameraO.position.set(this.m_pTaget.position.x, 200, this.m_pTaget.position.z);
                this.m_nZoomd += (this.m_nZoom - this.m_nZoomd) * 0.12;
                this.m_nDistance += (this.m_nZoom - this.m_nZoomd) * 0.01 * this.m_nDistance * 0.1;
                this.m_nDistance = Math.abs(this.m_nDistance);
                if (this.m_nDistance <= this.m_nDistanceMin) {
                    this.m_nDistance = this.m_nDistanceMin;
                }
                if (this.m_nDistance >= this.m_nDistanceMax) {
                    this.m_nDistance = this.m_nDistanceMax;
                }
                this.m_pCameraO.left = -this.m_nHalfWidth / 50 * this.m_nDistance * 0.13;
                this.m_pCameraO.right = this.m_nHalfWidth / 50 * this.m_nDistance * 0.13;
                this.m_pCameraO.top = this.m_nHalfHeight / 50 * this.m_nDistance * 0.13;
                this.m_pCameraO.bottom = -this.m_nHalfHeight / 50 * this.m_nDistance * 0.13;
                this.m_pCameraO.updateMatrixWorld(true);
                this.m_pCameraO.updateProjectionMatrix();
                break;
            case 1:
                this.m_nRotateH -= this.nRotateH;
                this.m_nRotateV += this.nRotateV;
                if (this.m_nRotateV >= 80) {
                    this.m_nRotateV = 80;
                }
                if (this.m_nRotateV <= 30) {
                    this.m_nRotateV = 30;
                }
                this.m_nRotatedH += (this.m_nRotateH - this.m_nRotatedH) * 0.12;
                this.m_nRotatedV += (this.m_nRotateV - this.m_nRotatedV) * 0.1;
                this.m_pCameraP.rotation.set(0.0, 0.0, 0.0);
                this.m_pCameraP.position.set(0.0, 0.0, 0.0);
                this.m_pCameraP.rotateOnAxis(new THREE.Vector3(1.0, 0.0, 0.0), THREE.Math.degToRad(-this.m_nRotatedV));
                this.m_pCameraP.updateMatrixWorld(true);
                this.m_pCameraP.rotateOnAxis(this.m_pCameraP.worldToLocal(new THREE.Vector3(0.0, 1.0, 0.0)), THREE.Math.degToRad(this.m_nRotatedH));
                this.m_pCameraP.updateMatrixWorld(true);
                this.m_pCameraP.position.set(this.m_pTaget.position.x + this.m_pCameraP.position.x, this.m_pTaget.position.y + this.m_pCameraP.position.y, this.m_pTaget.position.z + this.m_pCameraP.position.z);
                this.m_pCameraP.updateMatrixWorld(true);
                this.m_pTaget.rotation.set(0.0, 0.0, 0.0);
                this.m_pTaget.rotateOnAxis(this.m_pTaget.worldToLocal(new THREE.Vector3(0.0, 1.0, 0.0)), THREE.Math.degToRad(this.m_nRotatedH));
                this.m_nMoved.x += (this.m_nMove.x - this.m_nMoved.x) * 0.12;
                this.m_nMoved.y += (this.m_nMove.y - this.m_nMoved.y) * 0.12;
                let nMovedP = new THREE.Vector2((this.m_nMoved.x - this.m_nMove.x), (this.m_nMoved.y - this.m_nMove.y));
                this.m_pTaget.translateOnAxis(this.m_pTaget.worldToLocal(new THREE.Vector3(1.0, 0.0, 0.0)), nMovedP.x * 0.01 * this.m_nDistance * 0.1);
                this.m_pTaget.translateOnAxis(this.m_pTaget.worldToLocal(new THREE.Vector3(0.0, 0.0, 1.0)), nMovedP.y * 0.01 * this.m_nDistance * 0.1);
                this.m_nZoomd += (this.m_nZoom - this.m_nZoomd) * 0.12;
                this.m_nDistance += (this.m_nZoom - this.m_nZoomd) * 0.01 * this.m_nDistance * 0.1;
                this.m_nDistance = Math.abs(this.m_nDistance);
                if (this.m_nDistance <= this.m_nDistanceMin) {
                    this.m_nDistance = this.m_nDistanceMin;
                }
                if (this.m_nDistance >= this.m_nDistanceMax) {
                    this.m_nDistance = this.m_nDistanceMax;
                }
                this.m_pCameraP.translateZ(this.m_nDistance);
                this.m_pCameraP.updateMatrixWorld(true);
                this.m_pCameraP.updateProjectionMatrix();
                break;
        }
    }
    Reset() {
        if (this.mCameraState == null) {
            console.error("this.mCameraState == null");
        }
        else {
            this.SetViewState(this.mCameraState);
        }
    }
    ResetViwe() {
        switch (this.m_eViewMode) {
            case 0:
                this.m_pTaget.position.set(this.mOrthoPos.x, this.m_pTaget.position.y, this.mOrthoPos.z);
                this.m_pTaget.rotation.set(0.0, 0.0, 0.0);
                this.m_pTaget.rotateOnAxis(this.m_pTaget.worldToLocal(new THREE.Vector3(0.0, 1.0, 0.0)), THREE.Math.degToRad(this.nZRotated));
                this.m_nDistance = this.nOrthoScaled;
                this.m_pCameraO.rotation.set(THREE.Math.degToRad(-90), 0.0, THREE.Math.degToRad(this.nZRotated));
                break;
            case 1:
                this.m_pTaget.position.set(this.mPerspectPos.x, this.m_pTaget.position.y, this.mPerspectPos.z);
                this.m_nDistance = this.nForwardMoved;
                break;
            default:
                break;
        }
    }
    Tracking(pPos) {
        this.m_pTaget.position.set(pPos.x, this.m_pTaget.position.y, -pPos.z);
    }
    SwitchMode(pViewMode) {
        this.m_eViewMode = pViewMode;
        switch (pViewMode) {
            case 0:
                this.m_pCamera = this.m_pCameraO;
                break;
            case 1:
                this.m_pCamera = this.m_pCameraP;
                break;
            default:
                break;
        }
        this.ResetViwe();
    }
    SetViewState(pCameraState) {
        this.mCameraState = pCameraState;
        this.mPerspectPos.z = pCameraState.m_mPerspectPos.z;
        this.mPerspectPos.x = pCameraState.m_mPerspectPos.x;
        this.m_nRotateV = pCameraState.m_nVRotated;
        if (this.m_nRotateV == 0) {
            this.m_nRotateV = 60;
        }
        this.m_nRotateH = pCameraState.m_nHRotated;
        this.nForwardMoved = pCameraState.m_nForwardMoved * 1.4;
        if (this.nForwardMoved == 0) {
            this.nForwardMoved = 50;
        }
        if (Math.abs(this.m_nRotatedH - this.m_nRotateH) > 60) {
            this.m_nRotatedH = this.m_nRotateH - 10;
        }
        this.mOrthoPos.z = pCameraState.m_mOrthoPos.z;
        this.mOrthoPos.x = pCameraState.m_mOrthoPos.x;
        this.nOrthoScaled = pCameraState.m_nOrthoScaled * 2;
        if (this.nOrthoScaled == 0) {
            this.nOrthoScaled = 50;
        }
        this.nZRotated = pCameraState.m_nZRotated;
        this.ResetViwe();
    }
    WorldToScenePos(WorldPos) {
        let halfWidth = Engine.g_pInstance.m_pTextCanvas.width * 0.5;
        let halfHeight = Engine.g_pInstance.m_pTextCanvas.height * 0.5;
        let _position = new THREE.Vector3(WorldPos.x, WorldPos.y, -WorldPos.z);
        _position.project(this.m_pCamera);
        let result;
        if (_position.z >= 1) {
            result = {
                x: Math.round(_position.x * halfWidth + halfWidth),
                y: Math.round(-_position.y * halfHeight + halfHeight),
                z: _position.z
            };
        }
        else {
            result = {
                x: Math.round(_position.x * halfWidth + halfWidth),
                y: Math.round(-_position.y * halfHeight + halfHeight),
                z: _position.z
            };
        }
        return result;
    }
    SetCamDistan(nDis) {
        this.m_nDistance = nDis;
    }
    ray(pPoint) {
        let Sx = pPoint.pageX / Engine.g_pInstance.m_nCavasScale.x;
        let Sy = pPoint.pageY / Engine.g_pInstance.m_nCavasScale.y;
        if (this.m_eViewMode == 0) {
            let x = (Sx / Engine.g_pInstance.m_pTextCanvas.width) * 2 - 1;
            let y = -(Sy / Engine.g_pInstance.m_pTextCanvas.height) * 2 + 1;
            let halfW = Math.abs(this.m_pCameraO.left);
            let halfH = Math.abs(this.m_pCameraO.bottom);
            let CamPos = this.m_pCameraO.position;
            let pos = new Vector3(x * halfW + CamPos.x, 0, y * halfH - CamPos.z);
            Engine.g_pInstance.project.SetPos(new Vector3(pos.x, 0, pos.z), pPoint);
        }
        else {
            let x = (Sx / Engine.g_pInstance.m_pTextCanvas.width) * 2 - 1;
            let y = -(Sy / Engine.g_pInstance.m_pTextCanvas.height) * 2 + 1;
            let standardVector = new THREE.Vector3(x, y, 0.5);
            let worldVector = standardVector.unproject(this.m_pCamera);
            worldVector.z = -worldVector.z;
            let cont = new THREE.Vector3();
            let py = (0 - worldVector.y) / (this.m_pCamera.position.y - worldVector.y);
            let x1 = (this.m_pCamera.position.x - worldVector.x) * py + worldVector.x;
            let z1 = (-this.m_pCamera.position.z - worldVector.z) * py + worldVector.z;
            Engine.g_pInstance.project.SetPos(new Vector3(x1, 0, z1), pPoint);
        }
    }
    RayHouse(pPoint) {
        let raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2();
        let Sx = pPoint.pageX / Engine.g_pInstance.m_nCavasScale.x;
        let Sy = pPoint.pageY / Engine.g_pInstance.m_nCavasScale.y;
        mouse.x = (Sx / Engine.g_pInstance.m_pTextCanvas.width) * 2 - 1;
        mouse.y = -(Sy / Engine.g_pInstance.m_pTextCanvas.height) * 2 + 1;
        mouse.x = (pPoint.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(pPoint.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, this.m_pCamera);
        this.m_pModleArr = [];
        this.Traverse(MiaokitDC.g_pScene);
        let intersects = raycaster.intersectObjects(this.m_pModleArr);
        if (intersects.length > 0) {
            console.log("拾取物体", intersects[0].object.name);
        }
    }
    Traverse(pPanrent) {
        for (var i = 0; i < pPanrent.children.length; i++) {
            this.m_pModleArr.push(pPanrent.children[i]);
            this.Traverse(pPanrent.children[i]);
        }
    }
}
class TextBtn {
    constructor() {
        this.Btn = document.createElement('input');
        this.Btn.type = 'button';
        this.Btn.onclick = this.OnClick;
        this.Btn.style.height = 35 * Engine.g_pInstance.m_nCavasScale.y + "px";
        this.Btn.style.position = "absolute";
        this.Btn.style.background = "rgba(255, 255, 255, 1)";
        this.Btn.style.border = "0";
        this.Btn.style.visibility = "visible";
        this.Btn.style.zIndex = "2";
        TextBtn.Parent.appendChild(this.Btn);
        TextBtn.TextBtnArr.push(this);
    }
    static Init(pParent) {
        TextBtn.Parent = pParent;
    }
    static UpdateData(pDataArr) {
        let length = pDataArr == null ? 0 : pDataArr.Count;
        let need = length - TextBtn.TextBtnArr.length;
        for (let i = 0; i < need; i++) {
            new TextBtn();
        }
    }
    OnClick() {
        console.log(this.m_pData.m_pName);
    }
    SetData(pData) {
        this.m_pData = pData;
        this.Btn.value = this.m_pData.m_pName;
        this.m_pPosition = this.m_pData.m_mPoint.Object.m_mPosition;
    }
    UpdatePos() {
        let sencenpos = Engine.g_pInstance.m_pCameraCtrl.WorldToScenePos(this.m_pPosition);
        this.Btn.style.left = sencenpos.x * Engine.g_pInstance.m_nCavasScale.x + "px";
        this.Btn.style.top = sencenpos.y * Engine.g_pInstance.m_nCavasScale.y + "px";
    }
}
TextBtn.TextBtnArr = [];
class Project {
    constructor() {
        this.m_aWorkData = null;
        this.m_pNPaths = [];
        this.m_nMotion = 0;
        this.m_nSample = 0.1;
        this.m_nSampleFactor = 1;
        this.m_nSampleLength = 0;
        this.m_nNpointIndex = 0;
        this.m_bWaitVoice = false;
        this.m_pVoiceEnd = true;
        this.m_bWaitTime = false;
        this.m_nVoiceSpeed = 400;
        this.m_bRealTimeNavi = false;
        this.m_nRealTimeTab = 0;
        this.m_bAutoMotion = false;
        this.m_pFloorData = null;
        this.m_pBluePos = null;
        MiaokitDC.DC = new MiaokitDC();
        MiaokitDC.DC.DescriptorFactory = this.DescriptorFactory;
        MiaokitDC.DC.GroupFactory = this.GroupFactory;
        MiaokitDC.DC.CollectionFactory = this.CollectionFactory;
        MiaokitDC.DC.ComponentFactory = this.ComponentFactory;
    }
    version() {
        return 1000;
    }
    InitProject(pUrl, pCallback) {
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadProject(pUrl, function (pBuffer) {
            if (pBuffer != null) {
                let pReader = new BinaryReader(pBuffer);
                pThis.m_aWorkData = new Array(256);
                pThis.UnSerialize(pReader);
                MiaokitDC.DC.InitWorks(pThis.m_aWorkData, function (pError) {
                    MiaokitDC.DC.SwitchWork(0);
                    MiaokitDC.DC.ActiveLayer(0);
                    MiaokitDC.DC.m_pAssetsLoader.Load();
                    pCallback(pError);
                });
            }
            else {
                pCallback("Project.InitProject(): pBuffer != null.");
            }
        });
    }
    Start() {
    }
    Stop() {
    }
    Update() {
        MiaokitDC.DC.Update();
        this.VoiceNavi();
        this.RealTimeVoiceNavi();
    }
    Destroy() {
        console.info("Project.Destroy():...");
    }
    ActiveLayer(nIndex) {
        console.log("切换楼层-------弃用的方法");
    }
    DescriptorFactory(eType) {
        let pDesc = null;
        switch (eType) {
            case CollectionType.ATexture:
                pDesc = new ATextureDesc();
                break;
            case CollectionType.AHoleModel:
                pDesc = new AHoleModelDesc();
                break;
            case CollectionType.AEdgeModel:
                pDesc = new AEdgeModelDesc();
                break;
            case CollectionType.EFurnitureModel:
                pDesc = new EFurnitureModelDesc();
                break;
            case CollectionType.EBuildingModel:
                pDesc = new EBuildingModelDesc();
                break;
            case CollectionType.EPictureModel:
                pDesc = new EPictureModelDesc();
                break;
            default:
                alert("Project.DescriptorFactory(): !eType, " + eType);
                break;
        }
        return pDesc;
    }
    GroupFactory(eType) {
        return new ECollectionGroup(eType);
    }
    CollectionFactory(eType, pDesc) {
        let pCollection = null;
        switch (eType) {
            case CollectionType.ATexture:
                pCollection = new ATexture(pDesc);
                break;
            case CollectionType.AHoleModel:
                pCollection = new AHoleModel(pDesc);
                break;
            case CollectionType.AEdgeModel:
                pCollection = new AEdgeModel(pDesc);
                break;
            case CollectionType.EFurnitureModel:
                pCollection = new EFurnitureModel(pDesc);
                break;
            case CollectionType.EBuildingModel:
                pCollection = new EBuildingModel(pDesc);
                break;
            case CollectionType.EPictureModel:
                pCollection = new EPictureModel(pDesc);
                break;
            default:
                alert("Project.CollectionFactory(): !eType, " + eType);
                break;
        }
        return pCollection;
    }
    ComponentFactory(eType) {
        switch (eType) {
            case ComponentType.Panel:
            case ComponentType.Edge:
            case ComponentType.AreaBottom:
            case ComponentType.AreaTop:
            default:
                alert("Project.ComponentFactory(): !eType, " + eType);
                break;
        }
        return null;
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        let nIndex = pReader.ReadInt32();
        while (nIndex > -1) {
            let nLength = pReader.ReadInt32();
            this.m_aWorkData[nIndex] = pReader.ReadBytes(nLength);
            let nDataEnd = pReader.ReadInt32();
            if (nDataEnd != 19890430) {
                alert("Project.UnSerialize(): nDataEnd != 19890430.");
            }
            nIndex = pReader.ReadInt32();
        }
        if (nVersion > 1000) {
            let lightMode = pReader.ReadInt32();
        }
        else {
            let lightMode = 0;
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("Project.UnSerialize(): Bad end!");
        }
    }
    GetFloorCount() {
        return MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pALinerDC.m_pLayerMgr.GetLayersLenth();
    }
    ActiveFloor(nFloorIndex) {
        Engine.g_pInstance.pTouchNavPoint = null;
        MiaokitDC.DC.ActiveLayer(nFloorIndex);
        Engine.g_pInstance.m_pChooseLayer(nFloorIndex);
        let pLayerName = "";
        if (this.m_pFloorData != null) {
            let pLayerID = MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pEyejiaDC.m_pLayerMgr.GetLayer(nFloorIndex).name;
            for (let pFloor of this.m_pFloorData) {
                if (MiaokitDC.DC.m_nCurWork == pFloor.build_num && pLayerID == pFloor.floor_id) {
                    pLayerName = pFloor.floor_name;
                    break;
                }
            }
        }
        let pNavBackData = new NavBackData(MiaokitDC.DC.m_nCurWork, MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pID, nFloorIndex, pLayerName);
        console.log("Active:" + pNavBackData.PId);
        Engine.g_pInstance.m_pShowActiveLayer(pNavBackData);
        let pViewState = MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pEyejiaDC.m_pLayerMgr.GetLayer(nFloorIndex).m_pViewState;
        if (pViewState != null) {
            Engine.g_pInstance.SetViewState(pViewState);
        }
    }
    SwitchViewMode(eMode) {
        switch (MiaokitDC.DC.viewMode) {
            case ViewMode.Invalid:
                MiaokitDC.DC.viewMode = ViewMode.View2D;
                break;
            case ViewMode.View2D:
                MiaokitDC.DC.viewMode = ViewMode.View3D;
                break;
            case ViewMode.View3D:
                MiaokitDC.DC.viewMode = ViewMode.View2D;
                break;
        }
    }
    Navigate(pBegin, nEnd, nType) {
        console.log("起点编号", pBegin, "终点编号", nEnd, "优先通道类型", nType);
        Engine.g_pInstance.pTouchNavPoint = null;
        this.m_pNPaths = MiaokitDC.DC.m_pNavigator.FindPath(pBegin, nEnd, 0);
        if (this.m_pNPaths != null) {
            if (this.m_pNPaths.length == 0) {
                console.log("找不到路线");
                Engine.g_pInstance.m_pNoFindPath();
                return;
            }
            let nIndex = 0;
            while (nIndex < this.m_pNPaths.length) {
                console.log("线路起点", this.m_pNPaths[nIndex].m_pStartPoint.m_mLandmark.Object.m_pName, "线路终点", this.m_pNPaths[nIndex].m_pEndPoint.m_mLandmark.Object.m_pName);
                if (this.m_pNPaths[nIndex].m_aPath.length <= 1) {
                    this.m_pNPaths.splice(nIndex, 1);
                    nIndex--;
                }
                nIndex++;
            }
            console.log("线路数量", this.m_pNPaths.length);
            this.SwitchViewMode(0);
            if (this.m_pNPaths != null && this.m_pFloorData != null) {
                for (let pPath of this.m_pNPaths) {
                    let pWork = MiaokitDC.DC.GetWork(pPath.m_nWork);
                    let pLayerID = pWork.m_pEyejiaDC.m_pLayerMgr.GetLayer(pPath.m_nLayer).name;
                    for (let pFloor of this.m_pFloorData) {
                        if (pWork.m_pID == pFloor.build_num && pLayerID == pFloor.floor_id) {
                            pPath.m_pLayerName = pFloor.floor_name;
                            break;
                        }
                    }
                }
            }
            this.NavigateEnd();
        }
        else {
            this.m_pNPaths = [];
            console.log("找不到路线");
            Engine.g_pInstance.m_pNoFindPath();
        }
        Engine.g_pInstance.pPath = this.m_pNPaths;
    }
    BounceIcon(pBegin, nEndType, nGateType) {
        NavChartDC.DC.BounceIcon(nEndType);
        if (nEndType > 0) {
            return MiaokitDC.DC.m_pNavigator.FindNearest(pBegin, nEndType, nGateType);
        }
        return null;
    }
    NavigateEnd() {
        let NavBackDatas = [];
        for (let i = 0; i < this.m_pNPaths.length; i++) {
            if (this.m_pNPaths[i].m_aPath.length > 1) {
                NavBackDatas.push(new NavBackData(this.m_pNPaths[i].m_nWork, MiaokitDC.DC.GetWork(this.m_pNPaths[i].m_nWork).m_pID, this.m_pNPaths[i].m_nLayer, this.m_pNPaths[i].m_pLayerName));
            }
        }
        Engine.g_pInstance.m_pNavBack(NavBackDatas);
        this.SwitchWorkForIndex(NavBackDatas[0].HousId);
        this.ActiveFloor(NavBackDatas[0].LayerId);
        this.m_bAutoMotion = true;
        this.m_nMotion = 0;
    }
    NavBack(pNavBackData) {
        console.log(pNavBackData.HousId + "回看" + pNavBackData.LayerId);
        this.m_bAutoMotion = false;
        if (pNavBackData.HousId != MiaokitDC.DC.m_nCurWork) {
            this.SwitchWorkForIndex(pNavBackData.HousId);
        }
        this.ActiveFloor(pNavBackData.LayerId);
        this.m_nMotion = 0;
    }
    CloseNavBack() {
        console.log("退出回放.");
        this.m_pNPaths = [];
        Engine.g_pInstance.pPath = [];
        this.m_bAutoMotion = false;
    }
    SwitchWork(pId) {
        console.log("场景编辑编号" + pId);
        for (let pWork of MiaokitDC.DC.m_aWork) {
            if (pWork != null) {
                console.log("遍历场景" + pWork.m_pID);
                if (pWork.m_pID == pId) {
                    console.log("找到对应场景");
                    if (pWork.m_nIndex != MiaokitDC.DC.m_nCurWork) {
                        MiaokitDC.DC.SwitchWork(pWork.m_nIndex);
                    }
                    this.ActiveFloor(0);
                    let nLayerCount = MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pALinerDC.m_pLayerMgr.GetLayersLenth();
                    console.log("返回当前楼层数：" + nLayerCount + "Work.m_nIndex" + pWork.m_nIndex);
                    Engine.g_pInstance.m_pLayerUpdate(nLayerCount, pWork.m_nIndex);
                    if (pWork.m_nIndex == 0 && MiaokitDC.DC.m_pWorkArr.length > 1) {
                        console.log("通知H5是外景");
                        Engine.g_pInstance.m_pOutWorkBack(true);
                    }
                    else {
                        console.log("通知H5不是外景");
                        Engine.g_pInstance.m_pOutWorkBack(false);
                    }
                }
            }
        }
    }
    SwitchWorkForIndex(pWorkIndex) {
        if (pWorkIndex != MiaokitDC.DC.m_nCurWork) {
            MiaokitDC.DC.SwitchWork(pWorkIndex);
        }
        let nLayerCount = MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pALinerDC.m_pLayerMgr.GetLayersLenth();
        console.log("返回当前楼层数：" + nLayerCount + "Work.m_nIndex" + pWorkIndex);
        Engine.g_pInstance.m_pLayerUpdate(nLayerCount, pWorkIndex);
        console.log("Work数量：" + MiaokitDC.DC.m_pWorkArr.length);
        if (pWorkIndex == 0 && MiaokitDC.DC.m_pWorkArr.length > 1) {
            console.log("通知H5是外景");
            Engine.g_pInstance.m_pOutWorkBack(true);
        }
        else {
            console.log("通知H5不是外景");
            Engine.g_pInstance.m_pOutWorkBack(false);
        }
    }
    GoOutWork() {
        console.log("切换到外景");
        this.SwitchWorkForIndex(0);
        this.ActiveFloor(0);
    }
    Reset() {
        Engine.g_pInstance.m_pCameraCtrl.Reset();
        Engine.g_pInstance.pTouchNavPoint = null;
    }
    SetPos(pWordPos, pScenePos) {
        console.log("点击的世界坐标", pWordPos);
        let pArea = null;
        let pLandmarkList = NavChartDC.DC.m_pLayerMgr.m_pActiveLayer.m_mLandmarkList;
        let pLabelList = ALinerDC.DC.m_pLayerMgr.m_pActiveLayer.m_pLabelList;
        for (let pAAreaLabel of pLabelList) {
            if (pAAreaLabel.m_pArea != null) {
                if (pAAreaLabel.m_pArea.CollideBottom(pWordPos)) {
                    pArea = pAAreaLabel;
                }
            }
        }
        let lastNLandmark = null;
        for (let pNLandmark of pLandmarkList) {
            if (pArea == null) {
                break;
            }
            if (pNLandmark.m_pAAreaLabel != null && pNLandmark.m_pName != null) {
                if (pArea == pNLandmark.m_pAAreaLabel) {
                    if (lastNLandmark == null)
                        lastNLandmark = pNLandmark;
                    lastNLandmark = this.GetNearest(pWordPos, lastNLandmark, pNLandmark);
                }
            }
        }
        if (lastNLandmark != null) {
            Engine.g_pInstance.pTouchNavPoint = pWordPos;
            console.log("找到房间", lastNLandmark.m_pName, lastNLandmark.m_pSerial);
            Engine.g_pInstance.m_pSetNavPoint(lastNLandmark.m_pSerial, lastNLandmark.m_pName, pScenePos);
        }
        else {
            console.log("找不到房间");
            Engine.g_pInstance.pTouchNavPoint = null;
        }
    }
    GetNearest(pPosition, pNLandmark1, pNLandmark2) {
        if (Vector3.Distance(pPosition, pNLandmark1.m_mPoint.Object.m_mPosition) < Vector3.Distance(pPosition, pNLandmark2.m_mPoint.Object.m_mPosition)) {
            return pNLandmark1;
        }
        else {
            return pNLandmark2;
        }
    }
    GetBlueToothList() {
        let pBlueToothList = new Array();
        for (let pWork of MiaokitDC.DC.m_aWork) {
            if (pWork != null) {
                for (let pLayer of pWork.m_pEyejiaDC.m_pLayerMgr.m_pLayerList) {
                    pBlueToothList = pBlueToothList.concat(pLayer.GetBlueToothStation());
                }
            }
        }
        for (let blu of pBlueToothList) {
            console.log(blu.m_pMajorid, "蓝牙:", blu.m_pPosition.x, blu.m_pPosition.y, blu.m_pPosition.z);
        }
        return pBlueToothList;
    }
    CurrentPosition(nWorkID, nLayerID, pPosition) {
        Engine.g_pInstance.m_nBlueWorkID = nWorkID;
        Engine.g_pInstance.m_nBlueLayerID = nLayerID;
        Engine.g_pInstance.m_pBluePos = new Vector3(pPosition.x, 1.5, pPosition.y);
        this.m_pBluePos = new Vector3(pPosition.x, 1.5, pPosition.y);
        this.TestText("X" + pPosition.x.toFixed(3) + ",Y" + pPosition.y.toFixed(3) + ",Z" + pPosition.z.toFixed(3));
    }
    TestText(pText) {
        Engine.g_pInstance.pTestText = pText;
    }
    TestText2(aStation) {
        let sArr = [];
        let i = 0;
        for (let p of aStation) {
            sArr[i] = "Rssi:" + p.m_nRssi + "Position:" + p.m_mPosition.x.toFixed(2) + "," + p.m_mPosition.y.toFixed(2) + "," + p.m_mPosition.z.toFixed(2);
            i++;
        }
        Engine.g_pInstance.pTestTextArr = sArr;
    }
    VoiceNavi() {
        if (this.m_bRealTimeNavi)
            return;
        let nCurrLayer = EyejiaDC.DC.m_pLayerMgr.m_pActiveLayer.m_nIndex;
        let nCurrWork = MiaokitDC.DC.m_nCurWork;
        if (this.m_pNPaths != null) {
            if (this.m_pNPaths.length == 0)
                return;
            if (this.m_pNPaths[0].m_nWork == nCurrWork && this.m_pNPaths[0].m_nLayer == nCurrLayer) {
                if (this.m_pNPaths.length == 1) {
                    if (this.m_nMotion < 1) {
                        this.m_nMotion++;
                        this.VoicePost(["从", this.m_pNPaths[0].m_pStartPoint.m_mLandmark.Object.m_pName, "出发"]);
                        Engine.g_pInstance.CamTracking(this.m_pNPaths[0].m_pStartPoint.m_mPosition);
                        let min = new Vector2(this.m_pNPaths[0].m_pStartPoint.m_mPosition.x, this.m_pNPaths[0].m_pStartPoint.m_mPosition.z);
                        let max = new Vector2(this.m_pNPaths[0].m_pStartPoint.m_mPosition.x, this.m_pNPaths[0].m_pStartPoint.m_mPosition.z);
                        for (let p of this.m_pNPaths[0].m_aPath) {
                            if (p.x < min.x) {
                                min.x = p.x;
                            }
                            if (p.z < min.y) {
                                min.y = p.z;
                            }
                            if (p.x > max.x) {
                                max.x = p.x;
                            }
                            if (p.z > max.y) {
                                max.y = p.z;
                            }
                        }
                        if ((max.x - min.x) > (max.y - min.y)) {
                            Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.x - min.x) * 5);
                        }
                        else {
                            Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.y - min.y) * 5);
                        }
                    }
                    if (this.m_nMotion < 2 && this.m_pVoiceEnd) {
                        this.m_nMotion++;
                    }
                    if (this.m_nMotion >= 2) {
                        if (this.m_nMotion < 3) {
                            this.m_nMotion++;
                            this.VoicePost(["沿着标识路线行走", this.m_pNPaths[0].m_nDistance.toFixed(0).toString(), "米"]);
                            this.m_nNpointIndex = 0;
                            this.m_nSample = this.m_pNPaths[0].m_nDistance / (this.m_nVoiceSpeed * (9 + this.m_pNPaths[0].m_nDistance.toFixed(0).length) / 1000) / 45;
                            this.m_nSampleFactor = 1;
                            this.m_nSampleLength = 0;
                            console.log("采样", this.m_nSample);
                        }
                        if (!this.m_bWaitVoice && this.m_nMotion < 4) {
                            this.m_nMotion++;
                        }
                        if (this.m_nMotion >= 5) {
                            if (this.m_nMotion < 6) {
                                this.m_nMotion++;
                                this.VoicePost(["到达目的地", this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.m_pName]);
                            }
                        }
                        else if (this.m_nMotion == 4) {
                            if (this.m_nNpointIndex == 0) {
                                this.m_nNpointIndex++;
                            }
                            if (this.m_nNpointIndex < this.m_pNPaths[0].m_aPath.length) {
                                let pWatchPos;
                                let nCutDis = this.m_nSample * this.m_nSampleFactor;
                                this.m_nSampleFactor++;
                                while (this.m_nSampleLength < nCutDis) {
                                    this.m_nNpointIndex++;
                                    if (this.m_nNpointIndex >= this.m_pNPaths[0].m_aPath.length) {
                                        nCutDis = this.m_nSampleLength;
                                        Engine.g_pInstance.CamTracking(this.m_pNPaths[0].m_pEndPoint.m_mPosition);
                                        break;
                                    }
                                    this.m_nSampleLength += Vector3.Distance(this.m_pNPaths[0].m_aPath[this.m_nNpointIndex - 1], this.m_pNPaths[0].m_aPath[this.m_nNpointIndex]);
                                }
                                if (this.m_nNpointIndex < this.m_pNPaths[0].m_aPath.length) {
                                    let nDis = Vector3.Distance(this.m_pNPaths[0].m_aPath[this.m_nNpointIndex - 1], this.m_pNPaths[0].m_aPath[this.m_nNpointIndex]);
                                    let nRatio = (nDis - (this.m_nSampleLength - nCutDis)) / nDis;
                                    pWatchPos = Vector3.LerpVectors(this.m_pNPaths[0].m_aPath[this.m_nNpointIndex - 1], this.m_pNPaths[0].m_aPath[this.m_nNpointIndex], nRatio);
                                    Engine.g_pInstance.CamTracking(pWatchPos);
                                }
                            }
                            else {
                                if (this.m_pVoiceEnd) {
                                    console.log("第二段语音读完");
                                    this.m_nMotion++;
                                }
                            }
                        }
                    }
                }
                else {
                    if (this.m_nMotion < 1) {
                        this.m_nMotion++;
                        this.VoicePost(["从", this.m_pNPaths[0].m_pStartPoint.m_mLandmark.Object.m_pName, "出发"]);
                        Engine.g_pInstance.CamTracking(this.m_pNPaths[0].m_pStartPoint.m_mPosition);
                        let min = new Vector2(this.m_pNPaths[0].m_pStartPoint.m_mPosition.x, this.m_pNPaths[0].m_pStartPoint.m_mPosition.z);
                        let max = new Vector2(this.m_pNPaths[0].m_pStartPoint.m_mPosition.x, this.m_pNPaths[0].m_pStartPoint.m_mPosition.z);
                        for (let p of this.m_pNPaths[0].m_aPath) {
                            if (p.x < min.x) {
                                min.x = p.x;
                            }
                            if (p.z < min.y) {
                                min.y = p.z;
                            }
                            if (p.x > max.x) {
                                max.x = p.x;
                            }
                            if (p.z > max.y) {
                                max.y = p.z;
                            }
                        }
                        if ((max.x - min.x) > (max.y - min.y)) {
                            Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.x - min.x) * 5);
                        }
                        else {
                            Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.y - min.y) * 5);
                        }
                    }
                    if (this.m_nMotion < 2 && this.m_pVoiceEnd) {
                        this.m_nMotion++;
                    }
                    if (this.m_nMotion >= 2) {
                        if (this.m_nMotion < 3) {
                            this.m_nMotion++;
                            this.VoicePost(["沿着标识路线行走", this.m_pNPaths[0].m_nDistance.toFixed(0), "米"]);
                            this.m_nNpointIndex = 0;
                            this.m_nSample = this.m_pNPaths[0].m_nDistance / (this.m_nVoiceSpeed * (9 + this.m_pNPaths[0].m_nDistance.toFixed(0).length) / 1000) / 45;
                            this.m_nSampleFactor = 1;
                            this.m_nSampleLength = 0;
                            console.log("采样", this.m_nSample);
                        }
                        if (!this.m_bWaitVoice && this.m_nMotion < 4) {
                            this.m_nMotion++;
                        }
                        if (this.m_nMotion >= 5) {
                            if (this.m_nMotion < 6) {
                                this.m_nMotion++;
                                if (this.m_pNPaths[0].m_nWork == 0) {
                                    if (this.m_pNPaths[0].m_nWork == this.m_pNPaths[1].m_nWork) {
                                        this.VoicePost(["从", this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.TypeName(), "到达", (this.m_pNPaths[1].m_pLayerName)]);
                                    }
                                    else if (this.m_pNPaths[1].m_nWork != 0) {
                                        this.VoicePost(["从", this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.TypeName(), "进入", MiaokitDC.DC.GetWork(this.m_pNPaths[1].m_nWork).m_pID + (this.m_pNPaths[1].m_pLayerName)]);
                                    }
                                    else {
                                        this.VoicePost(["从", this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.TypeName(), "到达", MiaokitDC.DC.GetWork(this.m_pNPaths[1].m_nWork).m_pID + (this.m_pNPaths[1].m_pLayerName)]);
                                    }
                                }
                                else {
                                    if (this.m_pNPaths[0].m_nWork == this.m_pNPaths[1].m_nWork) {
                                        this.VoicePost(["从", this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.TypeName(), "到达", (this.m_pNPaths[1].m_pLayerName)]);
                                    }
                                    else if (this.m_pNPaths[1].m_nWork != 0) {
                                        this.VoicePost(["从", this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.TypeName(), "到达", MiaokitDC.DC.GetWork(this.m_pNPaths[1].m_nWork).m_pID + (this.m_pNPaths[1].m_pLayerName)]);
                                    }
                                    else {
                                        this.VoicePost(["从", this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.TypeName(), "出到", MiaokitDC.DC.GetWork(this.m_pNPaths[1].m_nWork).m_pID]);
                                    }
                                }
                                console.log("动画类型:", this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.m_nType);
                                switch (this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.m_nType) {
                                    case 0:
                                        console.log("无设置动画，默认调用上楼梯");
                                        this.MoveClip(0);
                                        break;
                                    case 1:
                                        if (this.m_pNPaths[0].m_nLayer < this.m_pNPaths[1].m_nLayer) {
                                            this.MoveClip(0);
                                        }
                                        else {
                                            this.MoveClip(1);
                                        }
                                        break;
                                    case 2:
                                        if (this.m_pNPaths[0].m_nLayer < this.m_pNPaths[1].m_nLayer) {
                                            this.MoveClip(6);
                                        }
                                        else {
                                            this.MoveClip(7);
                                        }
                                        break;
                                    case 3:
                                        if (this.m_pNPaths[0].m_nLayer < this.m_pNPaths[1].m_nLayer) {
                                            this.MoveClip(4);
                                        }
                                        else {
                                            this.MoveClip(5);
                                        }
                                        break;
                                    case 5:
                                        this.MoveClip(3);
                                        break;
                                    case 6:
                                        this.MoveClip(2);
                                        break;
                                    case 7:
                                        break;
                                    default:
                                        break;
                                }
                                this.m_nStarTime = new Date().getTime() + 4000;
                            }
                            else if (this.m_bAutoMotion) {
                                if (this.m_pVoiceEnd && new Date().getTime() > this.m_nStarTime) {
                                    if (this.m_pNPaths[1].m_nWork != MiaokitDC.DC.m_nCurWork) {
                                        this.SwitchWorkForIndex(this.m_pNPaths[1].m_nWork);
                                    }
                                    this.ActiveFloor(this.m_pNPaths[1].m_nLayer);
                                    this.m_nMotion = 0;
                                }
                            }
                        }
                        else if (this.m_nMotion == 4) {
                            if (this.m_nNpointIndex == 0) {
                                this.m_nNpointIndex++;
                            }
                            if (this.m_nNpointIndex < this.m_pNPaths[0].m_aPath.length) {
                                let pWatchPos;
                                let nCutDis = this.m_nSample * this.m_nSampleFactor;
                                this.m_nSampleFactor++;
                                while (this.m_nSampleLength < nCutDis) {
                                    this.m_nNpointIndex++;
                                    if (this.m_nNpointIndex >= this.m_pNPaths[0].m_aPath.length) {
                                        nCutDis = this.m_nSampleLength;
                                        Engine.g_pInstance.CamTracking(this.m_pNPaths[0].m_pEndPoint.m_mPosition);
                                        break;
                                    }
                                    this.m_nSampleLength += Vector3.Distance(this.m_pNPaths[0].m_aPath[this.m_nNpointIndex - 1], this.m_pNPaths[0].m_aPath[this.m_nNpointIndex]);
                                }
                                if (this.m_nNpointIndex < this.m_pNPaths[0].m_aPath.length) {
                                    let nDis = Vector3.Distance(this.m_pNPaths[0].m_aPath[this.m_nNpointIndex - 1], this.m_pNPaths[0].m_aPath[this.m_nNpointIndex]);
                                    let nRatio = (nDis - (this.m_nSampleLength - nCutDis)) / nDis;
                                    pWatchPos = Vector3.LerpVectors(this.m_pNPaths[0].m_aPath[this.m_nNpointIndex - 1], this.m_pNPaths[0].m_aPath[this.m_nNpointIndex], nRatio);
                                    Engine.g_pInstance.CamTracking(pWatchPos);
                                }
                            }
                            else {
                                if (this.m_pVoiceEnd) {
                                    this.m_nMotion++;
                                }
                            }
                        }
                    }
                }
            }
            else if (this.m_pNPaths[this.m_pNPaths.length - 1].m_nWork == nCurrWork && this.m_pNPaths[this.m_pNPaths.length - 1].m_nLayer == nCurrLayer) {
                let pPaths = this.m_pNPaths[this.m_pNPaths.length - 1];
                if (this.m_nMotion < 1) {
                    this.m_nMotion++;
                    this.VoicePost(["从", pPaths.m_pStartPoint.m_mLandmark.Object.m_pName, "出发"]);
                    Engine.g_pInstance.CamTracking(pPaths.m_pStartPoint.m_mPosition);
                    let min = new Vector2(pPaths.m_pStartPoint.m_mPosition.x, pPaths.m_pStartPoint.m_mPosition.z);
                    let max = new Vector2(pPaths.m_pStartPoint.m_mPosition.x, pPaths.m_pStartPoint.m_mPosition.z);
                    for (let p of pPaths.m_aPath) {
                        if (p.x < min.x) {
                            min.x = p.x;
                        }
                        if (p.z < min.y) {
                            min.y = p.z;
                        }
                        if (p.x > max.x) {
                            max.x = p.x;
                        }
                        if (p.z > max.y) {
                            max.y = p.z;
                        }
                    }
                    if ((max.x - min.x) > (max.y - min.y)) {
                        Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.x - min.x) * 5);
                    }
                    else {
                        Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.y - min.y) * 5);
                    }
                }
                if (this.m_nMotion < 2 && this.m_pVoiceEnd) {
                    this.m_nMotion++;
                }
                if (this.m_nMotion >= 2) {
                    if (this.m_nMotion < 3) {
                        this.m_nMotion++;
                        this.VoicePost(["沿着标识路线行走", pPaths.m_nDistance.toFixed(0), "米"]);
                        this.m_nNpointIndex = 0;
                        this.m_nSample = pPaths.m_nDistance / (this.m_nVoiceSpeed * (9 + pPaths.m_nDistance.toFixed(0).length) / 1000) / 45;
                        this.m_nSampleFactor = 1;
                        this.m_nSampleLength = 0;
                        console.log("采样", this.m_nSample);
                    }
                    if (!this.m_bWaitVoice && this.m_nMotion < 4) {
                        this.m_nMotion++;
                    }
                    if (this.m_nMotion >= 5) {
                        if (this.m_nMotion < 6) {
                            this.m_nMotion++;
                            this.VoicePost(["到达目的地", pPaths.m_pEndPoint.m_mLandmark.Object.m_pName]);
                        }
                    }
                    else if (this.m_nMotion == 4) {
                        if (this.m_nNpointIndex == 0) {
                            this.m_nNpointIndex++;
                        }
                        if (this.m_nNpointIndex < pPaths.m_aPath.length) {
                            let pWatchPos;
                            let nCutDis = this.m_nSample * this.m_nSampleFactor;
                            this.m_nSampleFactor++;
                            while (this.m_nSampleLength < nCutDis) {
                                this.m_nNpointIndex++;
                                if (this.m_nNpointIndex >= pPaths.m_aPath.length) {
                                    nCutDis = this.m_nSampleLength;
                                    Engine.g_pInstance.CamTracking(pPaths.m_pEndPoint.m_mPosition);
                                    break;
                                }
                                this.m_nSampleLength += Vector3.Distance(pPaths.m_aPath[this.m_nNpointIndex - 1], pPaths.m_aPath[this.m_nNpointIndex]);
                            }
                            if (this.m_nNpointIndex < pPaths.m_aPath.length) {
                                let nDis = Vector3.Distance(pPaths.m_aPath[this.m_nNpointIndex - 1], pPaths.m_aPath[this.m_nNpointIndex]);
                                let nRatio = (nDis - (this.m_nSampleLength - nCutDis)) / nDis;
                                pWatchPos = Vector3.LerpVectors(pPaths.m_aPath[this.m_nNpointIndex - 1], pPaths.m_aPath[this.m_nNpointIndex], nRatio);
                                Engine.g_pInstance.CamTracking(pWatchPos);
                            }
                        }
                        else {
                            if (this.m_pVoiceEnd) {
                                this.m_nMotion++;
                            }
                        }
                    }
                }
            }
            else {
                let nPathIndex = 0;
                for (let pPath of this.m_pNPaths) {
                    if (pPath.m_nWork == nCurrWork && pPath.m_nLayer == nCurrLayer) {
                        let pNextPath = this.m_pNPaths[nPathIndex + 1];
                        if (this.m_nMotion < 1) {
                            this.m_nMotion++;
                            this.VoicePost(["从", pPath.m_pStartPoint.m_mLandmark.Object.m_pName, "出发"]);
                            Engine.g_pInstance.CamTracking(pPath.m_pStartPoint.m_mPosition);
                            let min = new Vector2(pPath.m_pStartPoint.m_mPosition.x, pPath.m_pStartPoint.m_mPosition.z);
                            let max = new Vector2(pPath.m_pStartPoint.m_mPosition.x, pPath.m_pStartPoint.m_mPosition.z);
                            for (let p of pPath.m_aPath) {
                                if (p.x < min.x) {
                                    min.x = p.x;
                                }
                                if (p.z < min.y) {
                                    min.y = p.z;
                                }
                                if (p.x > max.x) {
                                    max.x = p.x;
                                }
                                if (p.z > max.y) {
                                    max.y = p.z;
                                }
                            }
                            if ((max.x - min.x) > (max.y - min.y)) {
                                Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.x - min.x) * 5);
                            }
                            else {
                                Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.y - min.y) * 5);
                            }
                        }
                        if (this.m_nMotion < 2 && this.m_pVoiceEnd) {
                            this.m_nMotion++;
                        }
                        if (this.m_nMotion >= 2) {
                            if (this.m_nMotion < 3) {
                                this.m_nMotion++;
                                this.VoicePost(["沿着标识路线行走", pPath.m_nDistance.toFixed(0), "米"]);
                                this.m_nNpointIndex = 0;
                                this.m_nSample = pPath.m_nDistance / (this.m_nVoiceSpeed * (9 + pPath.m_nDistance.toFixed(0).length) / 1000) / 45;
                                this.m_nSampleFactor = 1;
                                this.m_nSampleLength = 0;
                                console.log("采样", this.m_nSample);
                            }
                            if (!this.m_bWaitVoice && this.m_nMotion < 4) {
                                this.m_nMotion++;
                            }
                            if (this.m_nMotion >= 5) {
                                if (this.m_nMotion < 6) {
                                    this.m_nMotion++;
                                    if (pPath.m_nWork == 0) {
                                        if (pPath.m_nWork == pNextPath.m_nWork) {
                                            this.VoicePost(["从", pPath.m_pEndPoint.m_mLandmark.Object.TypeName(), "到达", (pNextPath.m_pLayerName)]);
                                        }
                                        else if (pNextPath.m_nWork != 0) {
                                            this.VoicePost(["从", pPath.m_pEndPoint.m_mLandmark.Object.TypeName(), "进入", MiaokitDC.DC.GetWork(pNextPath.m_nWork).m_pID + (pNextPath.m_pLayerName)]);
                                        }
                                        else {
                                            this.VoicePost(["从", pPath.m_pEndPoint.m_mLandmark.Object.TypeName(), "到达", MiaokitDC.DC.GetWork(pNextPath.m_nWork).m_pID + (pNextPath.m_pLayerName)]);
                                        }
                                    }
                                    else {
                                        if (pPath.m_nWork == pNextPath.m_nWork) {
                                            this.VoicePost(["从", pPath.m_pEndPoint.m_mLandmark.Object.TypeName(), "到达", (pNextPath.m_pLayerName)]);
                                        }
                                        else if (pNextPath.m_nWork != 0) {
                                            this.VoicePost(["从", pPath.m_pEndPoint.m_mLandmark.Object.TypeName(), "到达", MiaokitDC.DC.GetWork(pNextPath.m_nWork).m_pID + (pNextPath.m_pLayerName)]);
                                        }
                                        else {
                                            this.VoicePost(["从", pPath.m_pEndPoint.m_mLandmark.Object.TypeName(), "出到", MiaokitDC.DC.GetWork(pNextPath.m_nWork).m_pID]);
                                        }
                                    }
                                    console.log("动画类型:", pPath.m_pEndPoint.m_mLandmark.Object.m_nType);
                                    switch (pPath.m_pEndPoint.m_mLandmark.Object.m_nType) {
                                        case 0:
                                            console.log("无设置动画，默认调用上楼梯");
                                            this.MoveClip(0);
                                            break;
                                        case 1:
                                            if (pPath.m_nLayer < pNextPath.m_nLayer) {
                                                this.MoveClip(0);
                                            }
                                            else {
                                                this.MoveClip(1);
                                            }
                                            break;
                                        case 2:
                                            if (pPath.m_nLayer < pNextPath.m_nLayer) {
                                                this.MoveClip(6);
                                            }
                                            else {
                                                this.MoveClip(7);
                                            }
                                            break;
                                        case 3:
                                            if (pPath.m_nLayer < pNextPath.m_nLayer) {
                                                this.MoveClip(4);
                                            }
                                            else {
                                                this.MoveClip(5);
                                            }
                                            break;
                                        case 5:
                                            this.MoveClip(3);
                                            break;
                                        case 6:
                                            this.MoveClip(2);
                                            break;
                                        case 7:
                                            break;
                                        default:
                                            break;
                                    }
                                    this.m_nStarTime = new Date().getTime() + 4000;
                                }
                                else if (this.m_bAutoMotion) {
                                    if (this.m_pVoiceEnd && new Date().getTime() > this.m_nStarTime) {
                                        if (pNextPath.m_nWork != MiaokitDC.DC.m_nCurWork) {
                                            this.SwitchWorkForIndex(pNextPath.m_nWork);
                                        }
                                        this.ActiveFloor(pNextPath.m_nLayer);
                                        this.m_nMotion = 0;
                                    }
                                }
                            }
                            else if (this.m_nMotion == 4) {
                                if (this.m_nNpointIndex == 0) {
                                    this.m_nNpointIndex++;
                                }
                                if (this.m_nNpointIndex < pPath.m_aPath.length) {
                                    let pWatchPos;
                                    let nCutDis = this.m_nSample * this.m_nSampleFactor;
                                    this.m_nSampleFactor++;
                                    while (this.m_nSampleLength < nCutDis) {
                                        this.m_nNpointIndex++;
                                        if (this.m_nNpointIndex >= pPath.m_aPath.length) {
                                            nCutDis = this.m_nSampleLength;
                                            Engine.g_pInstance.CamTracking(pPath.m_pEndPoint.m_mPosition);
                                            break;
                                        }
                                        this.m_nSampleLength += Vector3.Distance(pPath.m_aPath[this.m_nNpointIndex - 1], pPath.m_aPath[this.m_nNpointIndex]);
                                    }
                                    if (this.m_nNpointIndex < pPath.m_aPath.length) {
                                        let nDis = Vector3.Distance(pPath.m_aPath[this.m_nNpointIndex - 1], pPath.m_aPath[this.m_nNpointIndex]);
                                        let nRatio = (nDis - (this.m_nSampleLength - nCutDis)) / nDis;
                                        pWatchPos = Vector3.LerpVectors(pPath.m_aPath[this.m_nNpointIndex - 1], pPath.m_aPath[this.m_nNpointIndex], nRatio);
                                        Engine.g_pInstance.CamTracking(pWatchPos);
                                    }
                                }
                                else {
                                    if (this.m_pVoiceEnd) {
                                        this.m_nMotion++;
                                    }
                                }
                            }
                        }
                    }
                    nPathIndex++;
                }
            }
        }
    }
    RealTimeVoiceNavi() {
        if (!this.m_bRealTimeNavi)
            return;
        let nCurrLayer = EyejiaDC.DC.m_pLayerMgr.m_pActiveLayer.m_nIndex;
        let nCurrWork = MiaokitDC.DC.m_nCurWork;
        if (Engine.g_pInstance.m_nBlueWorkID == nCurrWork && Engine.g_pInstance.m_nBlueLayerID == nCurrLayer) {
            if (this.m_pNPaths != []) {
                for (let pPath of this.m_pNPaths) {
                    if (pPath.m_nWork == nCurrWork && pPath.m_nLayer == nCurrLayer) {
                        let pNearPassage = null;
                        let nNearPassIndex = 0;
                        for (let pPathPassage of pPath.m_pPathPassage) {
                            if (pNearPassage == null) {
                                pNearPassage = pPathPassage;
                            }
                            else {
                                pNearPassage = this.NearPathPassage(this.m_pBluePos, pNearPassage, pPathPassage);
                            }
                            nNearPassIndex++;
                        }
                        if (5 < this.DisPathPassage(this.m_pBluePos, pNearPassage)) {
                            if (this.m_nRealTimeTab != 0) {
                                this.m_nRealTimeTab = 0;
                                this.VoicePost(["您已经偏离航线"]);
                            }
                            else {
                                if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                    this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 7 + 4000;
                                    this.m_bWaitTime = true;
                                }
                                if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                    this.VoicePost(["您已经偏离航线"]);
                                    this.m_bWaitTime = false;
                                }
                            }
                        }
                        else {
                            let frontDis = Vector3.Distance(this.m_pBluePos, pNearPassage.m_pEndPos);
                            let backDis = Vector3.Distance(this.m_pBluePos, pNearPassage.m_pStarPos);
                            if (backDis < 2) {
                                if (frontDis < 2) {
                                    let lastAngle = pNearPassage.m_pNextAngle;
                                    if (lastAngle < 110) {
                                        if (this.m_nRealTimeTab != 1) {
                                            this.m_nRealTimeTab = 1;
                                            this.VoicePost(["向左方行走"]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 5 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost(["向左方行走"]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                    else if (lastAngle < 150) {
                                        if (this.m_nRealTimeTab != 2) {
                                            this.m_nRealTimeTab = 2;
                                            this.VoicePost(["向左前方行走"]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 6 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost(["向左前方行走"]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                    else if (lastAngle < 210) {
                                        if (this.m_nRealTimeTab != 3) {
                                            this.m_nRealTimeTab = 3;
                                            this.VoicePost(["向右前方行走"]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 6 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost(["向右前方行走"]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                    else if (lastAngle < 250) {
                                        if (this.m_nRealTimeTab != 4) {
                                            this.m_nRealTimeTab = 4;
                                            this.VoicePost(["向右方行走"]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 5 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost(["向右方行走"]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (nNearPassIndex > 0) {
                                        let lastAngle = pPath.m_pPathPassage[nNearPassIndex - 1].m_pNextAngle;
                                        if (lastAngle < 110) {
                                            if (this.m_nRealTimeTab != 5) {
                                                this.m_nRealTimeTab = 5;
                                                this.VoicePost(["向左方行走"]);
                                            }
                                            else {
                                                if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                    this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 5 + 4000;
                                                    this.m_bWaitTime = true;
                                                }
                                                if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                    this.VoicePost(["向左方行走"]);
                                                    this.m_bWaitTime = false;
                                                }
                                            }
                                        }
                                        else if (lastAngle < 150) {
                                            if (this.m_nRealTimeTab != 6) {
                                                this.m_nRealTimeTab = 6;
                                                this.VoicePost(["向左前方行走"]);
                                            }
                                            else {
                                                if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                    this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 6 + 4000;
                                                    this.m_bWaitTime = true;
                                                }
                                                if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                    this.VoicePost(["向左前方行走"]);
                                                    this.m_bWaitTime = false;
                                                }
                                            }
                                        }
                                        else if (lastAngle < 210) {
                                            if (this.m_nRealTimeTab != 7) {
                                                this.m_nRealTimeTab = 7;
                                                this.VoicePost(["向右前方行走"]);
                                            }
                                            else {
                                                if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                    this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 6 + 4000;
                                                    this.m_bWaitTime = true;
                                                }
                                                if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                    this.VoicePost(["向右前方行走"]);
                                                    this.m_bWaitTime = false;
                                                }
                                            }
                                        }
                                        else if (lastAngle < 250) {
                                            if (this.m_nRealTimeTab != 8) {
                                                this.m_nRealTimeTab = 8;
                                                this.VoicePost(["向右方行走"]);
                                            }
                                            else {
                                                if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                    this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 5 + 4000;
                                                    this.m_bWaitTime = true;
                                                }
                                                if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                    this.VoicePost(["向右方行走"]);
                                                    this.m_bWaitTime = false;
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if (frontDis < 10) {
                                            let nextAngle = pNearPassage.m_pNextAngle;
                                            if (nextAngle == 0) {
                                                if (this.m_nRealTimeTab != 9) {
                                                    this.m_nRealTimeTab = 9;
                                                    this.VoicePost(["前方行走", frontDis.toString(), "米", "到达目的地"]);
                                                }
                                                else {
                                                    if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                        this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 11 + 4000;
                                                        this.m_bWaitTime = true;
                                                    }
                                                    if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                        this.VoicePost(["前方行走", frontDis.toString(), "米", "到达目的地"]);
                                                        this.m_bWaitTime = false;
                                                    }
                                                }
                                            }
                                            else if (nextAngle < 110) {
                                                if (this.m_nRealTimeTab != 10) {
                                                    this.m_nRealTimeTab = 10;
                                                    this.VoicePost(["前方", frontDis.toString(), "米", "向左行走"]);
                                                }
                                                else {
                                                    if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                        this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 8 + 4000;
                                                        this.m_bWaitTime = true;
                                                    }
                                                    if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                        this.VoicePost(["前方", frontDis.toString(), "米", "向左行走"]);
                                                        this.m_bWaitTime = false;
                                                    }
                                                }
                                            }
                                            else if (nextAngle < 150) {
                                                if (this.m_nRealTimeTab != 11) {
                                                    this.m_nRealTimeTab = 11;
                                                    this.VoicePost(["前方", frontDis.toString(), "米", "向左前方行走"]);
                                                }
                                                else {
                                                    if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                        this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 10 + 4000;
                                                        this.m_bWaitTime = true;
                                                    }
                                                    if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                        this.VoicePost(["前方", frontDis.toString(), "米", "向左前方行走"]);
                                                        this.m_bWaitTime = false;
                                                    }
                                                }
                                            }
                                            else if (nextAngle < 210) {
                                                if (this.m_nRealTimeTab != 12) {
                                                    this.m_nRealTimeTab = 12;
                                                    this.VoicePost(["前方", frontDis.toString(), "米", "向右前方行走"]);
                                                }
                                                else {
                                                    if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                        this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 10 + 4000;
                                                        this.m_bWaitTime = true;
                                                    }
                                                    if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                        this.VoicePost(["前方", frontDis.toString(), "米", "向右前方行走"]);
                                                        this.m_bWaitTime = false;
                                                    }
                                                }
                                            }
                                            else if (nextAngle < 250) {
                                                if (this.m_nRealTimeTab != 13) {
                                                    this.m_nRealTimeTab = 13;
                                                    this.VoicePost(["前方", frontDis.toString(), "米", "向右行走"]);
                                                }
                                                else {
                                                    if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                        this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 8 + 4000;
                                                        this.m_bWaitTime = true;
                                                    }
                                                    if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                        this.VoicePost(["前方", frontDis.toString(), "米", "向右行走"]);
                                                        this.m_bWaitTime = false;
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if (this.m_nRealTimeTab != 14) {
                                                this.m_nRealTimeTab = 14;
                                                this.VoicePost(["沿着当前路线直行"]);
                                            }
                                            else {
                                                if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                    this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 8 + 4000;
                                                    this.m_bWaitTime = true;
                                                }
                                                if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                    this.VoicePost(["沿着当前路线直行"]);
                                                    this.m_bWaitTime = false;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (frontDis > 10) {
                                    if (this.m_nRealTimeTab != 15) {
                                        this.m_nRealTimeTab = 15;
                                        this.VoicePost(["沿着当前路线直行"]);
                                    }
                                    else {
                                        if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                            this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 8 + 4000;
                                            this.m_bWaitTime = true;
                                        }
                                        if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                            this.VoicePost(["沿着当前路线直行"]);
                                            this.m_bWaitTime = false;
                                        }
                                    }
                                }
                                else {
                                    let nextAngle = pNearPassage.m_pNextAngle;
                                    if (nextAngle == 0) {
                                        if (this.m_nRealTimeTab != 16) {
                                            this.m_nRealTimeTab = 16;
                                            this.VoicePost(["前方直行", frontDis.toString(), "米", "到达目的地"]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 11 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost(["前方直行", frontDis.toString(), "米", "到达目的地"]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                    else if (nextAngle < 110) {
                                        if (this.m_nRealTimeTab != 17) {
                                            this.m_nRealTimeTab = 17;
                                            this.VoicePost(["前方", frontDis.toString(), "米", "向左行走"]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 8 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost(["前方", frontDis.toString(), "米", "向左行走"]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                    else if (nextAngle < 150) {
                                        if (this.m_nRealTimeTab != 18) {
                                            this.m_nRealTimeTab = 18;
                                            this.VoicePost(["前方", frontDis.toString(), "米", "向左前方行走"]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 10 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost(["前方", frontDis.toString(), "米", "向左前方行走"]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                    else if (nextAngle < 210) {
                                        if (this.m_nRealTimeTab != 19) {
                                            this.m_nRealTimeTab = 19;
                                            this.VoicePost(["前方", frontDis.toString(), "米", "向右前方行走"]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 10 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost(["前方", frontDis.toString(), "米", "向右前方行走"]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                    else if (nextAngle < 250) {
                                        if (this.m_nRealTimeTab != 20) {
                                            this.m_nRealTimeTab = 20;
                                            this.VoicePost(["前方", frontDis.toString(), "米", "向右行走"]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime = new Date().getTime() + this.m_nVoiceSpeed * 8 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime && new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost(["前方", frontDis.toString(), "米", "向右行走"]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    DisPathPassage(pPos, a) {
        return this.PointToSegDist(pPos.x, pPos.z, a.m_pStarPos.x, a.m_pStarPos.z, a.m_pEndPos.x, a.m_pEndPos.z);
    }
    NearPathPassage(pPos, a, b) {
        let aDis = this.PointToSegDist(pPos.x, pPos.z, a.m_pStarPos.x, a.m_pStarPos.z, a.m_pEndPos.x, a.m_pEndPos.z);
        let bDis = this.PointToSegDist(pPos.x, pPos.z, b.m_pStarPos.x, b.m_pStarPos.z, b.m_pEndPos.x, b.m_pEndPos.z);
        if (aDis < bDis) {
            return a;
        }
        else {
            return b;
        }
    }
    PointToSegDist(x, y, x1, y1, x2, y2) {
        let cross = (x2 - x1) * (x - x1) + (y2 - y1) * (y - y1);
        if (cross <= 0)
            return Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
        let d2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        if (cross >= d2)
            return Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2));
        let r = cross / d2;
        let px = x1 + (x2 - x1) * r;
        let py = y1 + (y2 - y1) * r;
        return Math.sqrt((x - px) * (x - px) + (py - y1) * (py - y1));
    }
    VoicePost(Voice) {
        console.log("提交语音--", Voice);
        this.m_bWaitVoice = true;
        this.m_bWaitTime = false;
        this.m_pVoiceEnd = false;
        Engine.g_pInstance.m_pVoicePost(Voice);
    }
    VoicePuse() {
        console.log("终止当前语音播放");
        this.m_bWaitVoice = false;
        this.m_pVoiceEnd = false;
    }
    MoveClip(ClipType) {
        console.log("当前段动画播放:", ClipType);
        Engine.g_pInstance.m_pMoviePost(ClipType);
    }
    VoiceStart() {
        console.log("当前段语音开始播放");
        this.m_bWaitVoice = false;
    }
    VoiceEnd() {
        console.log("当前段语音播放完毕");
        this.m_pVoiceEnd = true;
    }
    StopAutoMotion() {
        this.m_bAutoMotion = false;
        this.m_nMotion = 10;
    }
}
class NavBackData {
    constructor(nHousId, pPId, nLayerId, nLayerName) {
        this.HousId = nHousId;
        this.LayerId = nLayerId;
        this.PId = pPId;
        this.LayerName = nLayerName;
    }
}
class EFurnitureModel {
    constructor(pDesc) {
        this.m_mAttachment = new Handle(Attachment, 0);
        this.m_pModel = null;
        this.m_pDesc = null;
        this.m_bUpdated = false;
        this.m_aInitData = null;
        this.m_pBindAtrri = null;
        this.desc = pDesc;
    }
    get version() {
        return 1000;
    }
    get type() {
        return EntityType.Collection;
    }
    get attachment() {
        return this.m_mAttachment.Object;
    }
    set attachment(pAttachment) {
        this.m_mAttachment.Number = pAttachment.handle.Number;
        this.m_bUpdated = true;
    }
    get displayType() {
        return DisplayType.Normal;
    }
    set displayType(eType) {
    }
    get resource() {
        return this.model;
    }
    Remap(mHeap) {
        this.m_mAttachment.Heap = mHeap;
    }
    Apply() {
        if (this.m_bUpdated) {
            let bActive = this.attachment == null ? false : this.attachment.active;
            if (this.model != null) {
                this.model.SetActive(bActive);
            }
            this.m_bUpdated = false;
        }
    }
    Destroy() {
        this.m_bUpdated = false;
        this.m_pDesc = null;
        this.m_pModel = null;
    }
    Clear() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_aInitData = [new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 0.0, 0.0)];
        this.m_mAttachment.Number = pReader.ReadUInt32();
        this.m_aInitData[0].x = pReader.ReadSingle();
        this.m_aInitData[0].y = pReader.ReadSingle();
        this.m_aInitData[0].z = pReader.ReadSingle();
        this.m_aInitData[1].x = pReader.ReadSingle();
        this.m_aInitData[1].y = pReader.ReadSingle();
        this.m_aInitData[1].z = pReader.ReadSingle();
        this.m_aInitData[2].x = pReader.ReadSingle();
        this.m_aInitData[2].y = pReader.ReadSingle();
        this.m_aInitData[2].z = pReader.ReadSingle();
        let nTargetPos = pReader.ReadInt64();
        let nBindType = pReader.ReadUInt32();
        if (nBindType == 8) {
            pReader.ReadUInt32();
            let pID1 = pReader.ReadString();
            let pID2 = pReader.ReadString();
            let pID3 = pReader.ReadString();
            this.m_pBindAtrri = new EBlueTooth(this.m_aInitData[0], pID1, pID2, pID3);
        }
        pReader.Position = nTargetPos;
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("EFurnitureModel.UnSerialize(): Bad end!");
        }
        this.m_bUpdated = true;
    }
    get collectionType() {
        return CollectionType.EFurnitureModel;
    }
    set desc(pDesc) {
        if (this.m_pDesc == null) {
            this.m_pDesc = pDesc;
            if (this.m_pDesc != null) {
                if (this.m_pDesc.m_pModelUrl != null && this.m_pDesc.m_pModelUrl != "") {
                    this.m_pModel = this.m_pDesc.m_pModel.CloneModel();
                }
                else {
                    console.log(this.m_pDesc.name + "URL为" + this.m_pDesc.m_pModelUrl);
                    alert(this.m_pDesc.name + "URL为" + this.m_pDesc.m_pModelUrl);
                }
                if (this.m_pModel != null && this.m_aInitData != null) {
                    this.position = this.m_aInitData[0];
                    this.eulerAngles = this.m_aInitData[1];
                    this.localScale = this.m_aInitData[2];
                    this.m_aInitData = null;
                }
            }
            this.m_bUpdated = true;
        }
    }
    Inherit(pSrc) {
        return true;
    }
    get position() {
        if (this.m_pModel != null) {
            return this.m_pModel.position;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[0]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set position(mPosition) {
        if (this.model != null) {
            this.model.position = mPosition;
        }
        this.m_bUpdated = true;
    }
    get eulerAngles() {
        if (this.m_pModel != null) {
            return this.m_pModel.eulerAngles;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[1]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set eulerAngles(mAngles) {
        if (this.model != null) {
            this.model.eulerAngles = mAngles;
        }
        this.m_bUpdated = true;
    }
    get localScale() {
        if (this.m_pModel != null) {
            return this.m_pModel.localScale;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[2]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set localScale(mScale) {
        if (this.model != null) {
            this.model.localScale = mScale;
        }
        this.m_bUpdated = true;
    }
    get model() {
        return this.m_pModel;
    }
}
class EFurnitureModelDesc {
    constructor() {
        this.m_nID = 0;
        this.m_nCategoryID = 0;
        this.m_pName = null;
        this.m_nDefaultHeight = 0.0;
        this.m_mSize = new Vector3(0.0, 0.0, 0.0);
        this.m_pDeviceType = null;
        this.m_pModelUrl = null;
        this.m_pModelUrlH5 = null;
        this.m_pIconUrl = null;
        this.m_pModel = null;
        this.m_pModelType = null;
        this.m_bEnableScale = false;
    }
    get version() {
        return 1001;
    }
    Init(jData) {
    }
    Destory() {
        this.m_pModel = null;
    }
    Load(pProgress, pCallback) {
        if (this.m_pModelUrl == null || this.m_pModelUrl.length < 1) {
            pCallback(null);
            return;
        }
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadModel(this.m_pModelUrl, function (pObject) {
            if (pObject != null) {
                pThis.m_pModel = pObject;
                pThis.m_pModel.m_pName = pThis.m_pName;
            }
            else {
                console.log("模型加载失败", pThis.m_pModelUrl);
            }
            pCallback();
        });
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_nID = pReader.ReadInt32();
        this.m_nCategoryID = pReader.ReadInt32();
        this.m_pName = pReader.ReadString();
        this.m_nDefaultHeight = pReader.ReadSingle();
        this.m_mSize.x = pReader.ReadSingle();
        this.m_mSize.y = pReader.ReadSingle();
        this.m_mSize.z = pReader.ReadSingle();
        this.m_pModelUrl = pReader.ReadString();
        this.m_pIconUrl = pReader.ReadString();
        this.m_bEnableScale = pReader.ReadBoolean();
        this.m_pModelType = pReader.ReadString();
        this.m_pDeviceType = pReader.ReadString();
        if (nVersion > 1000) {
            this.m_pModelUrl = pReader.ReadString();
        }
        else {
        }
        if (nVersion > 1001) {
            let m_pModelUrlPC = pReader.ReadString();
        }
        else {
            let m_pModelUrlPC = "";
        }
        if (nVersion > 1002) {
            pReader.ReadString();
        }
        else {
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AHoleModel.Desc.UnSerialize(): Bad end!");
        }
    }
    get id() {
        return this.m_nID;
    }
    get typeId() {
        return this.m_nCategoryID;
    }
    get name() {
        return this.m_pName;
    }
    get desc() {
        return "";
    }
    get iconUrl() {
        return this.m_pIconUrl;
    }
    get resource() {
        return this.m_pModel;
    }
}
class EBuildingModel {
    constructor(pDesc) {
        this.m_mAttachment = new Handle(Attachment, 0);
        this.m_nWorkID = 0;
        this.m_pModel = null;
        this.m_pDesc = null;
        this.m_bUpdated = false;
        this.m_aInitData = null;
        this.desc = pDesc;
    }
    get version() {
        return 1000;
    }
    get type() {
        return EntityType.Collection;
    }
    get attachment() {
        return this.m_mAttachment.Object;
    }
    set attachment(pAttachment) {
        this.m_mAttachment.Number = pAttachment.handle.Number;
        this.m_bUpdated = true;
    }
    get displayType() {
        return DisplayType.Normal;
    }
    set displayType(eType) {
    }
    get resource() {
        return this.model;
    }
    Remap(mHeap) {
        this.m_mAttachment.Heap = mHeap;
    }
    Apply() {
        if (this.m_bUpdated) {
            let bActive = this.attachment == null ? false : this.attachment.active;
            if (this.model != null) {
                this.model.SetActive(bActive);
            }
            this.m_bUpdated = false;
        }
    }
    Destroy() {
        this.m_bUpdated = false;
        this.m_pDesc = null;
        this.m_pModel = null;
        this.m_nWorkID = 0;
    }
    Clear() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_aInitData = [new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 0.0, 0.0)];
        this.m_mAttachment.Number = pReader.ReadUInt32();
        this.m_nWorkID = pReader.ReadInt32();
        this.m_aInitData[0].x = pReader.ReadSingle();
        this.m_aInitData[0].y = pReader.ReadSingle();
        this.m_aInitData[0].z = pReader.ReadSingle();
        this.m_aInitData[1].x = pReader.ReadSingle();
        this.m_aInitData[1].y = pReader.ReadSingle();
        this.m_aInitData[1].z = pReader.ReadSingle();
        this.m_aInitData[2].x = pReader.ReadSingle();
        this.m_aInitData[2].y = pReader.ReadSingle();
        this.m_aInitData[2].z = pReader.ReadSingle();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("EBuildingModel.UnSerialize(): Bad end!");
        }
        this.m_bUpdated = true;
    }
    get collectionType() {
        return CollectionType.EBuildingModel;
    }
    set desc(pDesc) {
        if (this.m_pDesc == null) {
            this.m_pDesc = pDesc;
            if (this.m_pDesc != null) {
                if (this.m_pDesc.m_pModelUrl != null) {
                    this.m_pModel = this.m_pDesc.m_pModel.CloneModel();
                }
                else {
                    this.m_pModel = this.m_pDesc.m_pModel;
                }
                if (this.m_pModel != null && this.m_aInitData != null) {
                    this.m_aInitData = null;
                }
            }
            this.m_bUpdated = true;
        }
    }
    Inherit(pSrc) {
        return true;
    }
    get workID() {
        return this.m_nWorkID;
    }
    set workID(nWork) {
        this.m_nWorkID = nWork;
    }
    get position() {
        if (this.m_pModel != null) {
            return this.m_pModel.position;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[0]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set position(mPosition) {
        if (this.model != null) {
            this.model.position = mPosition;
        }
        this.m_bUpdated = true;
    }
    get eulerAngles() {
        if (this.m_pModel != null) {
            return this.m_pModel.eulerAngles;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[1]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set eulerAngles(mAngles) {
        if (this.model != null) {
            this.model.eulerAngles = mAngles;
        }
        this.m_bUpdated = true;
    }
    get localScale() {
        if (this.m_pModel != null) {
            return this.m_pModel.localScale;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[2]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set localScale(mScale) {
        if (this.model != null) {
            this.model.localScale = mScale;
        }
        this.m_bUpdated = true;
    }
    get model() {
        return this.m_pModel;
    }
}
class EBuildingModelDesc {
    constructor() {
        this.m_nID = 0;
        this.m_nCategoryID = 0;
        this.m_pName = null;
        this.m_nDefaultHeight = 0.0;
        this.m_mSize = new Vector3(0.0, 0.0, 0.0);
        this.m_pModelUrl = null;
        this.m_pModelUrlH5 = null;
        this.m_pIconUrl = null;
        this.m_pModel = null;
        this.m_pModelType = null;
    }
    get version() {
        return 1001;
    }
    Init(jData) {
    }
    InitByObject(pModel) {
        console.log("楼宇模型:" + pModel);
        this.m_nID = -1;
        this.m_nCategoryID = -1;
        this.m_pName = pModel.name;
        this.m_nDefaultHeight = 0.0;
        this.m_mSize = new Vector3(1.0, 1.0, 1.0);
        this.m_pModelUrl = null;
        this.m_pModelUrlH5 = null;
        this.m_pIconUrl = null;
        this.m_pModel = pModel;
        this.m_pModelType = null;
    }
    Destory() {
        this.m_pModel = null;
    }
    Load(pProgress, pCallback) {
        if (this.m_pModelUrl == null || this.m_pModelUrl.length < 1) {
            pCallback(null);
            return;
        }
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadModel(this.m_pModelUrl, function (pObject) {
            pThis.m_pModel = pObject;
            pThis.m_pModel.m_pName = pThis.m_pName;
            pCallback();
        });
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_nID = pReader.ReadInt32();
        this.m_nCategoryID = pReader.ReadInt32();
        this.m_pName = pReader.ReadString();
        this.m_nDefaultHeight = pReader.ReadSingle();
        this.m_mSize.x = pReader.ReadSingle();
        this.m_mSize.y = pReader.ReadSingle();
        this.m_mSize.z = pReader.ReadSingle();
        this.m_pModelUrl = pReader.ReadString();
        this.m_pIconUrl = pReader.ReadString();
        this.m_pModelType = pReader.ReadString();
        if (nVersion > 1000) {
            this.m_pModelUrl = pReader.ReadString();
        }
        else {
        }
        if (nVersion > 1001) {
            let m_pModelUrlPC = pReader.ReadString();
        }
        else {
            let m_pModelUrlPC = "";
        }
        if (nVersion > 1002) {
            pReader.ReadString();
        }
        else {
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("EBuildingModel.Desc.UnSerialize(): Bad end!");
        }
    }
    get id() {
        return this.m_nID;
    }
    get typeId() {
        return this.m_nCategoryID;
    }
    get name() {
        return this.m_pName;
    }
    get desc() {
        return "";
    }
    get iconUrl() {
        return this.m_pIconUrl;
    }
    get resource() {
        return this.m_pModel;
    }
}
class ECollectionGroup {
    constructor(eType) {
        this.m_mAttachment = new Handle(Attachment, 0);
        this.m_pObject = null;
        this.m_mPosition = new Vector3(0.0, 0.0, 0.0);
        this.m_pName = null;
        this.m_eType = GroupType.Invalid;
        this.m_pName = "";
        this.m_eType = eType;
    }
    get version() {
        return 1000;
    }
    get type() {
        return EntityType.Group;
    }
    get attachment() {
        return this.m_mAttachment.Object;
    }
    set attachment(pAttachment) {
        this.m_mAttachment.Number = pAttachment.handle.Number;
    }
    get displayType() {
        return DisplayType.Normal;
    }
    set displayType(eType) {
    }
    get resource() {
        return null;
    }
    Remap(mHeap) {
        this.m_mAttachment.Heap = mHeap;
    }
    Apply() {
    }
    Destroy() {
        this.m_pObject.Destroy();
        this.m_pObject = null;
    }
    Clear() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mAttachment.Number = pReader.ReadUInt32();
        let mPosition = new Vector3(0.0, 0.0, 0.0);
        mPosition.x = pReader.ReadSingle();
        mPosition.y = pReader.ReadSingle();
        mPosition.z = pReader.ReadSingle();
        this.m_pName = pReader.ReadString();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("ECollectionGroup.UnSerialize(): Bad end!");
        }
        this.position = mPosition;
    }
    get groupType() {
        return this.m_eType;
    }
    get gameObject() {
        if (this.m_pObject == null) {
            this.m_pObject = new GameObject("Group", GameObjectType.Empty);
            this.m_pObject.layer = Hook.LayerEnumToLayer(LayerType.EGroup);
            this.m_pObject.position = this.m_mPosition;
        }
        return this.m_pObject;
    }
    get position() {
        return this.m_pObject == null ? Vector3.Clone(this.m_mPosition) : this.m_pObject.position;
    }
    set position(mPosition) {
        this.m_mPosition.x = mPosition.x;
        this.m_mPosition.y = mPosition.y;
        this.m_mPosition.z = mPosition.z;
        if (this.m_pObject != null) {
            this.m_pObject.position = this.m_mPosition;
        }
    }
}
var BindAttriType;
(function (BindAttriType) {
    BindAttriType[BindAttriType["Normal"] = 0] = "Normal";
    BindAttriType[BindAttriType["EBlueTooth"] = 1] = "EBlueTooth";
})(BindAttriType || (BindAttriType = {}));
class EBlueTooth {
    constructor(pPosition, pUuid, pMajorid, pMinorid) {
        this.m_pPosition = null;
        this.m_pPosition = pPosition;
        this.bindType = BindAttriType.EBlueTooth;
        this.m_pUuid = pUuid;
        this.m_pMajorid = pMajorid;
        this.m_pMinorid = pMinorid;
    }
    SetPosition(pWorkID, pLayerID) {
        this.m_pWorkID = pWorkID;
        this.m_pLayerID = pLayerID;
    }
}
class EPictureModel {
    constructor(pDesc) {
        this.m_mAttachment = new Handle(Attachment, 0);
        this.m_pDesc = null;
        this.m_bUpdated = false;
        this.m_aInitData = null;
        this.m_pController = null;
        this.desc = pDesc;
    }
    get version() {
        return 1000;
    }
    get type() {
        return EntityType.Collection;
    }
    get attachment() {
        return this.m_mAttachment.Object;
    }
    set attachment(pAttachment) {
        this.m_mAttachment.Number = pAttachment.handle.Number;
        this.m_bUpdated = true;
    }
    get displayType() {
        return DisplayType.Normal;
    }
    set displayType(eType) {
    }
    get resource() {
        return this.model;
    }
    Remap(mHeap) {
        this.m_mAttachment.Heap = mHeap;
    }
    Apply() {
        if (this.m_bUpdated) {
            let bActive = this.attachment == null ? false : this.attachment.active;
            if (this.model != null) {
                this.model.SetActive(bActive);
            }
            this.m_bUpdated = false;
        }
    }
    Destroy() {
        this.m_bUpdated = false;
        this.m_pDesc = null;
        this.m_pController.Destroy();
        this.m_pController = null;
    }
    Clear() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_aInitData = [new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 0.0, 0.0)];
        this.m_mAttachment.Number = pReader.ReadUInt32();
        this.m_aInitData[0].x = pReader.ReadSingle();
        this.m_aInitData[0].y = pReader.ReadSingle();
        this.m_aInitData[0].z = pReader.ReadSingle();
        this.m_aInitData[1].x = pReader.ReadSingle();
        this.m_aInitData[1].y = pReader.ReadSingle();
        this.m_aInitData[1].z = pReader.ReadSingle();
        this.m_aInitData[2].x = pReader.ReadSingle();
        this.m_aInitData[2].y = pReader.ReadSingle();
        this.m_aInitData[2].z = pReader.ReadSingle();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("EPictureModel.UnSerialize(): Bad end!");
        }
        this.m_bUpdated = true;
    }
    get collectionType() {
        return CollectionType.EPictureModel;
    }
    set desc(pDesc) {
        if (this.m_pDesc == null) {
            this.m_pDesc = pDesc;
            if (this.m_pDesc != null) {
                this.m_pController = new PictureModel(this.m_pDesc.m_pAssetsPath, this.m_pDesc.m_pAssetsName);
                if (this.model != null && this.m_aInitData != null) {
                    this.position = this.m_aInitData[0];
                    this.eulerAngles = this.m_aInitData[1];
                    this.localScale = this.m_aInitData[2];
                    this.m_aInitData = null;
                }
            }
            this.m_bUpdated = true;
        }
    }
    Inherit(pSrc) {
        return true;
    }
    get position() {
        if (this.model != null) {
            return this.model.position;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[0]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set position(mPosition) {
        if (this.model != null) {
            this.model.position = mPosition;
            this.m_bUpdated = true;
        }
    }
    get eulerAngles() {
        if (this.model != null) {
            return this.model.eulerAngles;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[1]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set eulerAngles(mAngles) {
        if (this.model != null) {
            this.model.eulerAngles = mAngles;
            console.error("mAngles", mAngles.x, mAngles.y, mAngles.z);
            this.m_bUpdated = true;
        }
    }
    get localScale() {
        if (this.model != null) {
            return this.model.localScale;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[2]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set localScale(mScale) {
        if (this.model != null) {
            this.model.localScale = mScale;
            this.m_bUpdated = true;
        }
    }
    get model() {
        return this.m_pController.m_pRoot;
    }
}
class EPictureModelDesc {
    constructor() {
        this.m_nID = 0;
        this.m_nCategoryID = 0;
        this.m_pName = null;
        this.m_nDefaultHeight = 0.0;
        this.m_mSize = new Vector3(0.0, 0.0, 0.0);
        this.m_pModelUrl = null;
        this.m_pModelUrlH5 = null;
        this.m_pModelUrlPC = null;
        this.m_pIconUrl = null;
        this.m_bIsUserModel = false;
        this.m_pModelNum = null;
        this.m_pAssetsPath = null;
        this.m_pAssetsName = null;
    }
    get version() {
        return 1000;
    }
    Init(jData) {
    }
    Destory() {
    }
    Load(pProgress, pCallback) {
        if (this.m_pModelUrl == null || this.m_pModelUrl.length < 1) {
            pCallback(null);
            return;
        }
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadJson(this.m_pModelUrl, function (pObject) {
            pThis.m_pAssetsPath = pObject.Path;
            pThis.m_pAssetsName = pObject.Name;
            pCallback(null);
        });
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_nID = pReader.ReadInt32();
        this.m_nCategoryID = pReader.ReadInt32();
        this.m_pName = pReader.ReadString();
        this.m_nDefaultHeight = pReader.ReadSingle();
        this.m_mSize.x = pReader.ReadSingle();
        this.m_mSize.y = pReader.ReadSingle();
        this.m_mSize.z = pReader.ReadSingle();
        this.m_pModelUrl = pReader.ReadString();
        this.m_pModelUrlH5 = pReader.ReadString();
        this.m_pModelUrlPC = pReader.ReadString();
        this.m_pIconUrl = pReader.ReadString();
        this.m_bIsUserModel = pReader.ReadBoolean();
        this.m_pModelNum = pReader.ReadString();
        this.m_pAssetsPath = pReader.ReadString();
        this.m_pAssetsName = pReader.ReadString();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("EPictureModelDesc.Desc.UnSerialize(): Bad end!");
        }
    }
    get id() {
        return this.m_nID;
    }
    get typeId() {
        return this.m_nCategoryID;
    }
    get name() {
        return this.m_pName;
    }
    get desc() {
        return "";
    }
    get iconUrl() {
        return this.m_pIconUrl;
    }
    get resource() {
        return this.m_pAssetsPath + this.m_pAssetsName;
    }
}
class EyejiaDC {
    constructor(nIndex, pReader) {
        this.m_pLayerMgr = null;
        this.m_pLayerMgr = new EyejiaMgr(nIndex);
        if (pReader != null) {
            let pOldDC = EyejiaDC.DC;
            EyejiaDC.DC = this;
            this.UnSerialize(pReader);
            EyejiaDC.DC = pOldDC;
        }
    }
    Update() {
        PictureModel.Update();
    }
    OnGUI() {
    }
    OnViewModeChange() {
    }
    ActiveLayer(nIndex) {
        this.m_pLayerMgr.ActiveLayer(nIndex);
    }
    version() {
        return 1000;
    }
    Active(bActive) {
        this.m_pLayerMgr.Active(bActive);
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_pLayerMgr.UnSerialize(pReader);
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("EyejiaDC.UnSerialize(): Bad end!");
        }
    }
}
EyejiaDC.DC = null;
class EyejiaMgr {
    constructor(nWork) {
        this.m_nWork = 0;
        this.m_pActiveLayer = null;
        this.m_pSceneRoot = null;
        this.m_pLayerList = null;
        this.m_nWork = nWork;
        this.m_pActiveLayer = null;
        this.m_pSceneRoot = null;
        this.m_pLayerList = new Array();
    }
    version() {
        return 1000;
    }
    Active(bActive) {
        if (this.m_pSceneRoot != null) {
            this.m_pSceneRoot.SetActive(bActive);
        }
    }
    ActiveLayer(nIndex) {
        let pLayer = this.m_pLayerList[nIndex];
        if (this.m_pActiveLayer != null) {
            this.m_pActiveLayer.root.SetActive(false);
        }
        this.m_pActiveLayer = pLayer;
        if (this.m_pSceneRoot != null) {
            this.m_pActiveLayer.root.SetActive(true);
        }
    }
    GetLayer(nIndex) {
        if (nIndex < this.m_pLayerList.length) {
            return this.m_pLayerList[nIndex];
        }
        return null;
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        this.m_pSceneRoot = new GameObject("-Eyejia Root", GameObjectType.Empty);
        this.m_pSceneRoot.parent = MiaokitDC.DC.GetWork(this.m_nWork).m_pWorkRoot;
        let nVersion = pReader.ReadUInt32();
        let nCount = pReader.ReadInt32();
        for (let i = 0; i < nCount; i++) {
            let pLayer = Eyejia.Create(pReader);
            pLayer.m_nWork = this.m_nWork;
            pLayer.m_nIndex = i;
            pLayer.Rebuild(this.m_pSceneRoot);
            this.m_pLayerList.push(pLayer);
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("EyejiaMgr.UnSerialize(): Bad end!");
        }
    }
}
class Eyejia {
    constructor() {
        this.m_mMenuItemHeap = new HeapHandle(MenuItem, 0);
        this.m_mAttachmentHeap = new HeapHandle(Attachment, 0);
        this.m_mLayerRoot = new Handle(Attachment, 0);
        this.m_pViewState = new CameraState();
        this.m_nRefPicID = -1;
        this.m_mRefPicSize = new Vector2(0.0, 0.0);
        this.m_nDirectionHR = 0.0;
        this.m_nWork = 0;
        this.m_nIndex = 0;
    }
    version() {
        return 1000;
    }
    Rebuild(pSceneRoot) {
        let pThis = this;
        pThis.LoadGroup(pThis.m_mLayerRoot.Object);
        pThis.m_pName = pThis.m_mLayerRoot.Object.name;
        let pLayerRoot = pThis.root;
        pLayerRoot.parent = pSceneRoot;
        pLayerRoot.SetActive(false);
        pThis.Rebuild1();
    }
    Rebuild1() {
        let pThis = this;
        for (let pItem of pThis.m_mMenuItemHeap) {
            if (MiaokitDC.DC.BindMenuType(pItem)) {
                pItem.type.Add(pItem, pThis);
            }
            else {
                pItem.type = MiaokitDC.DC.m_pCategories;
                pItem.type.Add(pItem, this);
            }
            MiaokitDC.DC.m_pAssetsLoader.PushItem(pItem);
        }
        MiaokitDC.DC.m_pAssetsLoader.PushDelegate(pThis.m_nWork, function () {
            pThis.Rebuild2();
        });
    }
    Rebuild2() {
        let pThis = this;
        let pAttachmentList = new Array();
        for (let pAttachment of pThis.m_mAttachmentHeap) {
            pAttachmentList.push(pAttachment);
            let pMenuItem = pAttachment.menuItem.Object;
            if (pMenuItem != null) {
                pMenuItem.refCount++;
            }
        }
        if (pAttachmentList.length > 0) {
            pThis.Rebuild3(pAttachmentList);
            pThis.Rebuild5(pAttachmentList);
        }
        else {
            console.info("Eyejia.Rebuild2(): pAttachmentList.Count == 0.");
        }
    }
    Rebuild3(pList) {
        let pThis = this;
        for (let pAttachment of pList) {
            if (pAttachment.hook == null) {
                pThis.Rebuild4(pAttachment);
            }
        }
    }
    Rebuild4(pAttachment) {
        let pThis = this;
        if (pAttachment.hook != null) {
            return true;
        }
        if (pAttachment.builtin) {
            let pParent = pAttachment.parent.Object;
            if (pParent != null) {
                if (pThis.Rebuild4(pParent)) {
                    let pEntity = pParent.hook.gameObject.FindChild(pAttachment.binding);
                    if (pAttachment.entityType == EntityType.Collection) {
                        let pCollection = pAttachment.entity;
                        pCollection.desc = Eyejia.GetDefaultDesc(pCollection.collectionType, pEntity);
                    }
                    let pHook = pEntity.AddHook();
                    pAttachment.hook = pHook;
                    pHook.attachment = pAttachment;
                    pHook.SetLayer();
                    return true;
                }
                else {
                    alert("Eyejia.Rebuild4(): Parent rebuild error: " + pParent.name);
                    return false;
                }
            }
            else {
                alert("Eyejia.Rebuild4(): pParent == null.");
                return false;
            }
        }
        else {
            switch (pAttachment.entityType) {
                case EntityType.Group:
                    pThis.LoadGroup(pAttachment);
                    return true;
                case EntityType.Collection:
                    pThis.LoadCollection(pAttachment);
                    return true;
                default:
                    pAttachment.valid = false;
                    alert("Eyejia.Rebuild4(): Entity type invalid. " + pAttachment.entityType);
                    break;
            }
        }
        return false;
    }
    Rebuild5(pList) {
        for (let pAttachment of pList) {
            if (pAttachment.entityType != EntityType.Component) {
                if (pAttachment.builtin == false) {
                    let pParent = pAttachment.parent.Object;
                    if (pParent != null) {
                        pAttachment.hook.gameObject.parent = pParent.hook.gameObject;
                    }
                }
            }
        }
        for (let pAttachment of pList) {
            if (pAttachment.entity != null) {
                pAttachment.entity.Apply();
            }
        }
    }
    LoadGroup(pAttachment) {
        let pGroup = pAttachment.entity;
        let pHook = pGroup.gameObject.AddHook();
        pAttachment.hook = pHook;
        pHook.attachment = pAttachment;
    }
    LoadCollection(pAttachment) {
        let pThis = this;
        pThis.Init(pAttachment.menuItem.Object, function (pItem) {
            if (pItem == null) {
                pAttachment.valid = false;
                return;
            }
            let pCollection = pAttachment.entity;
            let pHook = null;
            switch (pCollection.collectionType) {
                case CollectionType.ETexture:
                    pCollection.desc = pItem.collectionDesc;
                    break;
                case CollectionType.EFurnitureModel:
                    pCollection.desc = pItem.collectionDesc;
                    let pFurniture = pCollection;
                    let pFurnitureModel = pFurniture.model;
                    if (pFurnitureModel != null) {
                        pHook = pFurnitureModel.AddHook();
                        pFurnitureModel.SetActive(true);
                    }
                    pAttachment.hook = pHook;
                    pHook.attachment = pAttachment;
                    pHook.SetLayer();
                    break;
                case CollectionType.EBuildingModel:
                    pCollection.desc = pItem.collectionDesc;
                    let pBuilding = pCollection;
                    let pBuildingModel = pBuilding.model;
                    if (pBuildingModel != null) {
                        pHook = pBuildingModel.AddHook();
                        pBuildingModel.SetActive(true);
                    }
                    pAttachment.hook = pHook;
                    pHook.attachment = pAttachment;
                    pHook.SetLayer();
                    break;
                case CollectionType.EPictureModel:
                    pCollection.desc = pItem.collectionDesc;
                    let pPicture = pCollection;
                    let pPictureModel = pPicture.model;
                    if (pPictureModel != null) {
                        pHook = pPictureModel.AddHook();
                        pPictureModel.SetActive(true);
                    }
                    pAttachment.hook = pHook;
                    pHook.attachment = pAttachment;
                    pHook.SetLayer();
                    break;
                default:
                    alert("Eyejia.LoadCollection(): Invalid collection type.");
                    break;
            }
        });
    }
    Init(pItem, pCallback) {
        let pThis = this;
        let pType = pItem.type;
        if (pType != null) {
            let pItemValid = pType.Search(pItem, this);
            if (pItemValid == null) {
                pItemValid = pThis.m_mMenuItemHeap.CreateData(0, pItem).Object;
                pType.Add(pItemValid, this);
                pItemValid.LoadAndSet(null, pCallback);
            }
            else {
                pItemValid.LoadAndSet(null, pCallback);
            }
        }
        else {
            alert("Eyejia.Init(): pType == null.");
            pCallback(null);
        }
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mMenuItemHeap.Number = pReader.ReadUInt32();
        this.m_mAttachmentHeap.Number = pReader.ReadUInt32();
        this.m_mLayerRoot.Number = pReader.ReadUInt32();
        this.m_mMenuItemHeap.InitHeap(pReader);
        this.m_mAttachmentHeap.InitHeap(pReader);
        this.m_pViewState.UnSerialize(pReader);
        this.m_nRefPicID = pReader.ReadInt32();
        this.m_mRefPicSize.x = pReader.ReadSingle();
        this.m_mRefPicSize.y = pReader.ReadSingle();
        if (nVersion > 1000) {
            this.m_nDirectionHR = pReader.ReadSingle();
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("Eyejia.UnSerialize(): Bad end!");
        }
    }
    GetBlueToothStation() {
        let pAttachmentList = new Array();
        for (let pAttachment of this.m_mAttachmentHeap) {
            if (pAttachment.entityType == EntityType.Collection) {
                let pCollection = pAttachment.entity;
                if (pCollection.collectionType == CollectionType.EFurnitureModel) {
                    let pEFurnitureModel = pCollection;
                    if (pEFurnitureModel.m_pBindAtrri == null)
                        continue;
                    if (pEFurnitureModel.m_pBindAtrri.bindType == BindAttriType.EBlueTooth) {
                        pEFurnitureModel.m_pBindAtrri.SetPosition(this.m_nWork, this.m_nIndex);
                        pAttachmentList.push(pEFurnitureModel.m_pBindAtrri);
                    }
                }
            }
        }
        return pAttachmentList;
    }
    static Create(pReader = null) {
        let pEyejia = new Eyejia();
        if (pReader != null) {
            pEyejia.UnSerialize(pReader);
        }
        else {
            pEyejia.m_mMenuItemHeap = new HeapHandle(MenuItem, 0);
            pEyejia.m_mAttachmentHeap = new HeapHandle(Attachment, 0);
            pEyejia.m_mMenuItemHeap.InitHeap();
            pEyejia.m_mAttachmentHeap.InitHeap();
        }
        return pEyejia;
    }
    static GetDefaultDesc(eType, pObject) {
        switch (eType) {
            case CollectionType.EBuildingModel:
                let pBuildingDesc = new EBuildingModelDesc();
                pBuildingDesc.InitByObject(pObject);
                return pBuildingDesc;
            default:
                alert("Eyejia.GetDefaultDesc(): Invalid type.");
                break;
        }
        return null;
    }
    get root() {
        return this.m_mLayerRoot.Object.hook.gameObject;
    }
    get name() {
        return this.m_pName;
    }
}
class PictureModel {
    constructor(pPath, pName) {
        this.m_pRoot = null;
        this.m_pCollider = null;
        this.m_pFilePath = null;
        this.m_pFileName = null;
        this.m_pSceneRoot = null;
        this.m_aFrustum = null;
        this.m_pFlushList = null;
        this.m_pUnfoldQueue = null;
        this.m_bFlush = true;
        this.m_bFlushing = false;
        this.m_nLoading = 0;
        this.m_nTick = 0;
        this.m_bLived = false;
        console.log("PictureModel: " + pPath + pName);
        let pThis = this;
        pThis.m_pFilePath = pPath;
        pThis.m_pFileName = pName;
        pThis.m_pRoot = new GameObject("PictureModel: " + pName, GameObjectType.Empty);
        pThis.LoadScene(function (pScene) {
            if (null !== pScene) {
                pThis.m_pSceneRoot = pThis.LoadMeshPyramid(pScene.m_aLayer);
                pThis.m_pFlushList = new Array();
                pThis.m_pUnfoldQueue = new Array();
                pThis.m_nLoading = 0;
                pThis.m_nTick = 0;
            }
        });
        PictureModel.g_pList.push(this);
        pThis.m_bLived = true;
    }
    Destroy() {
        let pThis = this;
        PictureModel.g_pList.splice(PictureModel.g_pList.indexOf(pThis), 1);
        pThis.m_bLived = false;
        if (0 == pThis.m_nLoading && !pThis.m_bFlushing) {
            pThis.m_pRoot.Destroy();
            pThis.m_pRoot = null;
        }
    }
    Flush() {
        let pThis = this;
        if (null !== pThis.m_pSceneRoot) {
            if (0 == pThis.m_nLoading && 0 < pThis.m_pUnfoldQueue.length) {
                let nCount = Mathf.Clamp(pThis.m_pUnfoldQueue.length, 1, 8);
                pThis.m_nLoading = nCount;
                for (let i = 0; i < nCount; i++) {
                    let pItem = pThis.m_pUnfoldQueue.shift();
                    pThis.Unfold(pItem, function () {
                        pItem.m_bUnfolding = false;
                        if (0 == --pThis.m_nLoading) {
                            pThis.m_bFlush = true;
                            if (!pThis.m_bLived && !pThis.m_bFlushing) {
                                pThis.m_pRoot.Destroy();
                                pThis.m_pRoot = null;
                            }
                        }
                    });
                }
            }
            if (0 == pThis.m_nTick++ % 10) {
                pThis.m_bFlush = true;
            }
            if (!pThis.m_bFlushing && pThis.m_bFlush) {
                pThis.m_bFlushing = true;
                pThis.Flush2(pThis.m_pSceneRoot, function () {
                    pThis.m_bFlush = false;
                    pThis.m_bFlushing = false;
                    pThis.m_pRoot.m_pObject.updateMatrixWorld();
                    if (!pThis.m_bLived && !pThis.m_bFlushing) {
                        pThis.m_pRoot.Destroy();
                        pThis.m_pRoot = null;
                    }
                });
            }
        }
    }
    Flush2(pRoot, pCallback) {
        let pThis = this;
        pThis.m_pFlushList = new Array();
        pThis.m_pFlushList.push(pRoot);
        let nIndex = 0;
        while (nIndex < pThis.m_pFlushList.length) {
            let pNode = pThis.m_pFlushList[nIndex];
            let nOrder = pThis.Check(pNode);
            if (2 == nOrder) {
                if (!pNode.m_bChildValid) {
                    if (!pNode.m_bUnfolding) {
                        pThis.m_pUnfoldQueue.push(pNode);
                        pNode.m_bUnfolding = true;
                    }
                    nOrder = 1;
                }
                else {
                    for (let pChild of pNode.m_pChildren) {
                        pThis.m_pFlushList.push(pChild);
                    }
                }
            }
            pNode.m_nOrder = nOrder;
            nIndex++;
        }
        while (-1 < --nIndex) {
            let pNode = pThis.m_pFlushList[nIndex];
            if (pNode.m_nShowType != pNode.m_nOrder) {
                if (0 == pNode.m_nOrder) {
                    pNode.m_pObject.SetActive(false);
                    pNode.m_nShowType = pNode.m_nOrder;
                }
                else if (1 == pNode.m_nOrder) {
                    pNode.m_pObject.SetActive(true);
                    pNode.m_pMesh.SetActive(true);
                    pNode.m_nShowType = pNode.m_nOrder;
                    for (let pChild of pNode.m_pChildren) {
                        pChild.m_pObject.SetActive(false);
                        pChild.m_nShowType = 0;
                    }
                }
                else {
                    pNode.m_pObject.SetActive(true);
                    pNode.m_pMesh.SetActive(false);
                    pNode.m_nShowType = pNode.m_nOrder;
                }
            }
            if (0 < pNode.m_nOrder) {
                pNode.m_nTimestamp = pThis.m_nTick;
            }
        }
        pCallback();
    }
    Check(pNode) {
        let nShowType = pNode.m_nLevel < 5 ? 2 : 1;
        if (1 == nShowType) {
            if (pNode.m_aResId == null || pNode.m_aResId.length < 1) {
                if (pNode.m_aChildGroup.length > 0) {
                    nShowType = 2;
                }
            }
        }
        else {
            if (pNode.m_aChildGroup.length == 0) {
                nShowType = 1;
            }
        }
        return nShowType;
    }
    LoadScene(pCallback) {
        this.LoadTextAsyn(this.m_pFilePath + this.m_pFileName, function (pData) {
            let jLayers = pData.layers;
            let pScene = new Scene();
            pScene.m_nVersion = pData["3mxVersion"];
            pScene.m_pName = pData.name;
            pScene.m_pDesc = pData.description;
            pScene.m_pLogo = pData.logo;
            pScene.m_pOptions = pData.sceneOptions;
            pScene.m_aLayer = new Array(jLayers.length);
            for (let i = 0; i < jLayers.length; i++) {
                let jLayer = jLayers[i];
                let pLayer = pScene.m_aLayer[i] = new Layer();
                pLayer.m_pType = jLayer.type;
                pLayer.m_pID = jLayer.id;
                pLayer.m_pName = jLayer.name;
                pLayer.m_pDesc = jLayer.description;
                pLayer.m_pSRS = jLayer.SRS;
                pLayer.m_pSRSOrigin = jLayer.SRSOrigin;
                pLayer.m_pRoot = jLayer.root;
            }
            pCallback(pScene);
        });
    }
    LoadMeshPyramid(aLayer) {
        let pNode = new SNode(0, null, null);
        pNode.m_pPath = this.m_pFilePath;
        pNode.m_pID = "Root";
        pNode.m_aChildGroup = new Array(aLayer.length);
        for (let i = 0; i < aLayer.length; i++) {
            pNode.m_aChildGroup[i] = new Group(pNode, aLayer[i].m_pRoot, i);
        }
        return pNode;
    }
    Unfold(pNode, pCallback) {
        let pThis = this;
        let nCount = pNode.m_aChildGroup.length;
        let nIndex = nCount;
        for (let i = 0; i < nCount; i++) {
            pThis.Construct(pNode.m_aChildGroup[i], function (nType) {
                if (--nIndex == 0) {
                    if (0 == nType) {
                        if (pNode.m_pParent == null) {
                            let mPosition = pThis.m_pRoot.position;
                            let mEulerAngles = pThis.m_pRoot.eulerAngles;
                            pThis.m_pRoot.position = new Vector3(0.0, 0.0, 0.0);
                            pThis.m_pRoot.eulerAngles = new Vector3(0.0, 0.0, 0.0);
                            pThis.EncapsBounds(pNode);
                            let mCenter = Vector3.Scale(0.5, Vector3.Add(pNode.m_mBBMin, pNode.m_mBBMax));
                            let mSize = Vector3.Sub(pNode.m_mBBMax, pNode.m_mBBMin);
                            let pTrans = pNode.m_pMesh;
                            pTrans.parent = null;
                            pTrans.position = mCenter;
                            pTrans.SetParent(pNode.m_pObject, false);
                            pNode.m_pObject.SetParent(pThis.m_pRoot, false);
                            pNode.m_pObject.position = Vector3.Sub(new Vector3(0.0, mSize.y * 0.5, 0.0), mCenter);
                            pThis.m_pRoot.position = mPosition;
                            pThis.m_pRoot.eulerAngles = mEulerAngles;
                            pThis.m_pRoot.m_pObject.updateMatrixWorld();
                            let mPosition3 = pTrans.m_pObject.getWorldPosition();
                            let mEulerAngles3 = pTrans.m_pObject.getWorldRotation();
                            console.error("mPosition3: ", mPosition3);
                            console.error("mEulerAngles3: ", mEulerAngles3.y * 57.29578);
                        }
                    }
                    pNode.m_bChildValid = true;
                    pCallback();
                }
            });
        }
    }
    Construct(pGroup, pCallback) {
        if (pGroup.m_nBufferAddr > 0) {
            if (!pGroup.m_bCreated) {
                this.LoadAsyn(pGroup.m_pPath + pGroup.m_pFile, function (aData) {
                    if (aData) {
                        pGroup.Create(aData, function () {
                            pCallback(1);
                        });
                    }
                    else {
                        pCallback(1);
                    }
                });
            }
            else {
                pCallback(2);
            }
        }
        else {
            this.LoadAsyn(pGroup.m_pPath + pGroup.m_pFile, function (aData) {
                if (aData) {
                    pGroup.Init(aData, function () {
                        pCallback(0);
                    });
                }
                else {
                    pCallback(0);
                }
            });
        }
    }
    EncapsBounds(pNode) {
        let mBBMin = new Vector3(0.0, 0.0, 0.0);
        let mBBMax = new Vector3(0.0, 0.0, 0.0);
        for (let i = 0; i < pNode.m_pChildren.length; i++) {
            let pChild = pNode.m_pChildren[i];
            if (i == 0) {
                mBBMin = pChild.m_mBBMin;
                mBBMax = pChild.m_mBBMax;
            }
            else {
                mBBMin.x = Math.min(mBBMin.x, pChild.m_mBBMin.x);
                mBBMin.y = Math.min(mBBMin.y, pChild.m_mBBMin.y);
                mBBMin.z = Math.min(mBBMin.z, pChild.m_mBBMin.z);
                mBBMax.x = Math.max(mBBMax.x, pChild.m_mBBMax.x);
                mBBMax.y = Math.max(mBBMax.y, pChild.m_mBBMax.y);
                mBBMax.z = Math.max(mBBMax.z, pChild.m_mBBMax.z);
            }
        }
        pNode.m_mBBMin = mBBMin;
        pNode.m_mBBMax = mBBMax;
        let mSize = Vector3.Sub(mBBMax, mBBMin);
        pNode.m_nMaxDiameter = Math.max(mSize.x, Math.max(mSize.y, mSize.z));
    }
    LoadTextAsyn(pUrl, pCallback) {
        var pRequest = new XMLHttpRequest();
        pRequest.open("GET", pUrl, true);
        pRequest.responseType = "json";
        pRequest.onload = function (e) {
            if (pRequest.status == 200) {
                pCallback(pRequest.response);
            }
            else {
                pCallback(null);
            }
        };
        pRequest.send(null);
    }
    LoadAsyn(pUrl, pCallback) {
        var pRequest = new XMLHttpRequest();
        pRequest.open("GET", pUrl, true);
        pRequest.responseType = "arraybuffer";
        pRequest.onload = function (e) {
            if (pRequest.status == 200) {
                pCallback(pRequest.response);
            }
            else {
                pCallback(null);
            }
        };
        pRequest.send(null);
    }
    static Update() {
        for (let pModel of PictureModel.g_pList) {
            pModel.Flush();
        }
    }
}
PictureModel.g_pList = new Array();
class Scene {
    constructor() {
        this.m_nVersion = 0;
        this.m_pName = null;
        this.m_pDesc = null;
        this.m_pLogo = null;
        this.m_pOptions = null;
        this.m_aLayer = null;
    }
}
class Layer {
    constructor() {
        this.m_pType = null;
        this.m_pID = null;
        this.m_pName = null;
        this.m_pDesc = null;
        this.m_pSRS = null;
        this.m_pSRSOrigin = null;
        this.m_pRoot = null;
    }
}
class SNode {
    constructor(nIndex, pParent, pGroup) {
        this.m_nLevel = 0;
        this.m_nIndex = 0;
        this.m_pPath = "";
        this.m_pID = "";
        this.m_mBBMin = new Vector3(0.0, 0.0, 0.0);
        this.m_mBBMax = new Vector3(0.0, 0.0, 0.0);
        this.m_nMaxDiameter = 0.0;
        this.m_pParent = null;
        this.m_pGroup = null;
        this.m_aResId = null;
        this.m_aResource = null;
        this.m_aChildGroup = null;
        this.m_pChildren = new Array();
        this.m_bChildValid = false;
        this.m_nOrder = 0;
        this.m_nShowType = 0;
        this.m_nTimestamp = 0;
        this.m_bUnfolding = false;
        this.m_pObject = null;
        this.m_pMesh = null;
        this.m_pLast = null;
        this.m_pNext = null;
        this.m_nLevel = pParent != null ? pParent.m_nLevel + 1 : 0;
        this.m_nIndex = nIndex;
        this.m_pParent = pParent;
        this.m_pGroup = pGroup;
        let pName = "Level: " + this.m_nLevel + "-" + (this.m_pGroup ? this.m_pGroup.m_nIndex : "0") + "-" + this.m_nIndex;
        this.m_pObject = new GameObject(pName, GameObjectType.Empty);
        if (this.m_pParent != null) {
            this.m_pObject.SetParent(this.m_pParent.m_pObject, false);
        }
        this.m_pMesh = new GameObject("Mesh", GameObjectType.Mesh);
        this.m_pMesh.SetParent(this.m_pObject, false);
    }
    Free() {
        for (let pGroup of this.m_aChildGroup) {
            pGroup.Free();
        }
        this.m_bChildValid = false;
    }
}
class Group {
    constructor(pNode, pFile, nIndex) {
        this.m_pNode = null;
        this.m_pPath = null;
        this.m_pFile = null;
        this.m_nIndex = 0;
        this.m_nVersion = 0;
        this.m_aNode = null;
        this.m_aResource = null;
        this.m_nBufferAddr = 0;
        this.m_bCreated = false;
        this.m_pNode = pNode;
        this.m_pPath = pNode.m_pPath + pFile.substr(0, pFile.lastIndexOf("/") + 1);
        this.m_pFile = pFile.substr(pFile.lastIndexOf("/") + 1);
        this.m_nIndex = nIndex;
    }
    Init(aData, pCallback) {
        let pReader = new BinaryReader(aData);
        let pMagicNum = pReader.ReadString2(5);
        if ("3MXBO" == pMagicNum) {
            let nHeaderSize = pReader.ReadUInt32();
            let pHeader = pReader.ReadString2(nHeaderSize);
            let jHeader = JSON.parse(pHeader);
            let jNodes = jHeader.nodes;
            let jResources = jHeader.resources;
            this.m_nVersion = jHeader.version;
            this.m_aNode = new Array(jNodes.length);
            this.m_aResource = new Array(jResources.length);
            this.m_nBufferAddr = pReader.Position;
            for (let i = 0; i < this.m_aResource.length; i++) {
                let jResource = jResources[i];
                let pType = jResource.type;
                if (pType == "textureBuffer") {
                    let pResource = new TextureBuffer();
                    pResource.m_pType = pType;
                    pResource.m_pID = jResource.id;
                    pResource.m_pFormat = jResource.format;
                    pResource.m_nSize = jResource.size;
                    this.m_aResource[i] = pResource;
                }
                else if (pType == "geometryBuffer") {
                    let pResource = new GeometryBuffer();
                    pResource.m_pType = pType;
                    pResource.m_pID = jResource.id;
                    pResource.m_pFormat = jResource.format;
                    pResource.m_nSize = jResource.size;
                    pResource.m_mBBMin.x = jResource.bbMin[0];
                    pResource.m_mBBMin.y = jResource.bbMin[1];
                    pResource.m_mBBMin.z = jResource.bbMin[2];
                    pResource.m_mBBMax.x = jResource.bbMax[0];
                    pResource.m_mBBMax.y = jResource.bbMax[1];
                    pResource.m_mBBMax.z = jResource.bbMax[2];
                    pResource.m_pTextureID = jResource["texture"] != null ? jResource.texture : null;
                    let mBBmax = new Vector3(-pResource.m_mBBMin.x, pResource.m_mBBMax.z, -pResource.m_mBBMin.y);
                    let mBBMin = new Vector3(-pResource.m_mBBMax.x, pResource.m_mBBMin.z, -pResource.m_mBBMax.y);
                    pResource.m_mBBMin = mBBMin;
                    pResource.m_mBBMax = mBBmax;
                    this.m_aResource[i] = pResource;
                    if (pResource.m_pTextureID != null) {
                        for (let j = 0; j < i; j++) {
                            if (this.m_aResource[j].m_pID == pResource.m_pTextureID) {
                                pResource.m_pTexture = this.m_aResource[j];
                                break;
                            }
                        }
                    }
                }
                else if (pType == "textureFile") {
                    let pResource = new TextureFile();
                    pResource.m_pType = pType;
                    pResource.m_pID = jResource.id;
                    pResource.m_pFormat = jResource.format;
                    pResource.m_pFileName = jResource.file;
                    this.m_aResource[i] = pResource;
                }
                else if (pType == "geometryFile") {
                    let pResource = new GeometryFile();
                    pResource.m_pType = pType;
                    pResource.m_pID = jResource.id;
                    pResource.m_pFormat = jResource.format;
                    pResource.m_pFileName = jResource.file;
                    pResource.m_pTextureID = jResource.texture != null ? jResource.texture : null;
                    this.m_aResource[i] = pResource;
                    if (pResource.m_pTextureID != null) {
                        for (let j = 0; j < i; j++) {
                            if (this.m_aResource[j].m_pID == pResource.m_pTextureID) {
                                pResource.m_pTexture = this.m_aResource[j];
                                break;
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < this.m_aNode.length; i++) {
                let jNode = jNodes[i];
                let pNode = this.m_aNode[i] = new SNode(i, this.m_pNode, this);
                pNode.m_pPath = this.m_pPath;
                pNode.m_pID = jNode.id;
                pNode.m_mBBMin.x = jNode.bbMin[0];
                pNode.m_mBBMin.y = jNode.bbMin[1];
                pNode.m_mBBMin.z = jNode.bbMin[2];
                pNode.m_mBBMax.x = jNode.bbMax[0];
                pNode.m_mBBMax.y = jNode.bbMax[1];
                pNode.m_mBBMax.z = jNode.bbMax[2];
                pNode.m_nMaxDiameter = jNode.maxScreenDiameter;
                let mBBMax = new Vector3(-pNode.m_mBBMin.x, pNode.m_mBBMax.z, -pNode.m_mBBMin.y);
                let mBBMin = new Vector3(-pNode.m_mBBMax.x, pNode.m_mBBMin.z, -pNode.m_mBBMax.y);
                pNode.m_mBBMin = mBBMin;
                pNode.m_mBBMax = mBBMax;
                let mSize = Vector3.Sub(mBBMax, mBBMin);
                pNode.m_nMaxDiameter = Math.max(mSize.x, Math.max(mSize.y, mSize.z));
                let jChildren = jNode.children;
                let jResIds = jNode.resources;
                pNode.m_aChildGroup = new Array(jChildren.length);
                pNode.m_aResId = new Array(jResIds.length);
                pNode.m_aResource = new Array(jResIds.length);
                for (let j = 0; j < pNode.m_aChildGroup.length; j++) {
                    pNode.m_aChildGroup[j] = new Group(pNode, jChildren[j], j);
                }
                for (let j = 0; j < pNode.m_aResId.length; j++) {
                    pNode.m_aResId[j] = jResIds[j];
                    for (let pRes of this.m_aResource) {
                        if (pNode.m_aResId[j] == pRes.m_pID) {
                            pNode.m_aResource[j] = pRes;
                            break;
                        }
                    }
                }
                this.m_pNode.m_pChildren.push(pNode);
            }
        }
        this.Create2(pReader, function () {
            pCallback();
        });
    }
    Create(aData, pCallback) {
        let pReader = new BinaryReader(aData);
        this.Create2(pReader, function () {
            pCallback();
        });
    }
    Create2(pReader, pCallback) {
        pReader.Position = this.m_nBufferAddr;
        for (let pRes of this.m_aResource) {
            pRes.Create(pReader);
        }
        for (let pNode of this.m_aNode) {
            let pTrans = pNode.m_pMesh;
            let mPosition = Vector3.Scale(0.5, Vector3.Add(pNode.m_mBBMin, pNode.m_mBBMax));
            pTrans.position = mPosition;
            for (let pRes of pNode.m_aResource) {
                if (pRes.m_pType == "geometryBuffer") {
                    let pObject = pRes.m_pObject;
                    pObject.parent = pTrans;
                    pObject.position = Vector3.Scale(-1.0, mPosition);
                    pObject.SetActive(true);
                }
                else if (pRes.m_pType == "geometryFile") {
                }
            }
            pTrans.parent = pNode.m_pObject;
            pTrans.SetParent(pNode.m_pObject, false);
        }
        this.m_bCreated = true;
        pCallback();
    }
    Free() {
        for (let pRes of this.m_aResource) {
            pRes.Free();
        }
        this.m_bCreated = false;
    }
}
class TextureBuffer {
    constructor() {
        this.m_pType = null;
        this.m_pID = null;
        this.m_pFormat = null;
        this.m_nSize = null;
        this.m_pTexture = null;
    }
    Create(pReader) {
        let pData = pReader.ReadBytes(this.m_nSize);
        let pBlob = new Blob([pData]);
        let pImage = new Image();
        let pTexture = new THREE.Texture();
        pTexture.image = pImage;
        pTexture.format = THREE.RGBFormat;
        pImage.src = window.URL.createObjectURL(pBlob);
        pImage.onload = function (e) {
            pTexture.needsUpdate = true;
            window.URL.revokeObjectURL(this.src);
        };
        this.m_pTexture = pTexture;
    }
    Free() {
        this.m_pTexture = null;
    }
}
class GeometryBuffer {
    constructor() {
        this.m_pType = null;
        this.m_pID = null;
        this.m_pFormat = null;
        this.m_nSize = 0;
        this.m_mBBMin = new Vector3(0.0, 0.0, 0.0);
        this.m_mBBMax = new Vector3(0.0, 0.0, 0.0);
        this.m_pTextureID = null;
        this.m_pTexture = null;
        this.m_pObject = null;
    }
    Create(pReader) {
        let pData = pReader.ReadBytes(this.m_nSize);
        let pTexture = null;
        if (this.m_pTexture && this.m_pTexture.m_pType == "textureBuffer") {
            pTexture = this.m_pTexture.m_pTexture;
        }
        else if (this.m_pTexture && this.m_pTexture.m_pType == "textureFile") {
            pTexture = this.m_pTexture.m_pTexture;
        }
        let pMesh = this.CreateMesh(pData);
        let pMaterial = new Material(MaterialType.AreaBottom);
        let pObject = new GameObject(this.m_pID, GameObjectType.Mesh);
        pMaterial.SetTexture(0, pTexture);
        pObject.SetGeometry2(pMesh, pMaterial);
        pObject.SetActive(false);
        this.m_pObject = pObject;
    }
    Free() {
        this.m_pObject.Destroy();
        this.m_pObject = null;
    }
    CreateMesh(aData) {
        var pData = new Uint8Array(aData);
        let pStream = new CTM.Stream(pData);
        let pFile = new CTM.File(pStream);
        return this.CreateGeometry(pFile);
    }
    CreateGeometry(pFile) {
        let Model = function () {
            THREE.BufferGeometry.call(this);
            this.materials = [];
            let indices = pFile.body.indices;
            let positions = pFile.body.vertices;
            let normals = pFile.body.normals;
            let uvs;
            let colors;
            let uvMaps = pFile.body.uvMaps;
            if (uvMaps !== undefined && uvMaps.length > 0) {
                uvs = uvMaps[0].uv;
            }
            let attrMaps = pFile.body.attrMaps;
            if (attrMaps !== undefined && attrMaps.length > 0 && attrMaps[0].name === 'Color') {
                colors = attrMaps[0].attr;
            }
            {
                let new_indices = new Uint32Array(indices.length);
                let tri_count = new_indices.length / 3;
                for (let i = 0; i < tri_count; i++) {
                    let i0 = i * 3;
                    let i1 = i0 + 1;
                    let i2 = i1 + 1;
                    new_indices[i0] = indices[i0];
                    new_indices[i1] = indices[i2];
                    new_indices[i2] = indices[i1];
                }
                this.setIndex(new THREE.BufferAttribute(new_indices, 1));
            }
            if (positions !== undefined) {
                let new_positions = new Float32Array(positions.length);
                let count = positions.length / 3;
                let index = 0;
                for (let i = 0; i < count; i++) {
                    new_positions[index++] = -positions[(i * 3)];
                    new_positions[index++] = positions[(i * 3) + 2];
                    new_positions[index++] = -positions[(i * 3) + 1];
                }
                this.addAttribute('position', new THREE.BufferAttribute(new_positions, 3));
            }
            if (normals !== undefined) {
                this.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
            }
            if (uvs !== undefined) {
                this.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
            }
            if (colors !== undefined) {
                this.addAttribute('color', new THREE.BufferAttribute(colors, 4));
            }
        };
        Model.prototype = Object.create(THREE.BufferGeometry.prototype);
        Model.prototype.constructor = Model;
        var geometry = new Model();
        if (geometry.attributes.normal === undefined) {
            geometry.computeVertexNormals();
        }
        return geometry;
    }
}
class TextureFile {
    constructor() {
        this.m_pType = null;
        this.m_pID = null;
        this.m_pFormat = null;
        this.m_pFileName = null;
        this.m_pTexture = null;
    }
    Create(pReader) {
    }
    Free() {
        this.m_pTexture = null;
    }
}
class GeometryFile {
    constructor() {
        this.m_pType = null;
        this.m_pID = null;
        this.m_pFormat = null;
        this.m_pFileName = null;
        this.m_pTextureID = null;
        this.m_pTexture = null;
        this.m_pObject = null;
    }
    Create(pReader) {
    }
    Free() {
        this.m_pObject.Destroy();
        this.m_pObject = null;
    }
}
class NavChartDC {
    constructor(nIndex, pReader) {
        this.m_pLayerMgr = null;
        this.m_nBounceType = 4;
        this.m_nBounceStep = 0;
        this.m_nBounceSign = 1;
        this.m_pLayerMgr = new NavChartMgr(nIndex);
        if (pReader != null) {
            let pOldDC = NavChartDC.DC;
            NavChartDC.DC = this;
            this.UnSerialize(pReader);
            NavChartDC.DC = pOldDC;
        }
    }
    Update() {
        if (this.m_nBounceType > 1) {
            this.m_nBounceStep += this.m_nBounceSign;
            if (this.m_nBounceStep % 64 == 0) {
                this.m_nBounceSign = -this.m_nBounceSign;
            }
            this.m_pLayerMgr.m_pActiveLayer.m_pIconMgr.Update(this.m_nBounceType, this.m_nBounceStep / 128.0);
        }
    }
    OnGUI() {
    }
    ActiveLayer(nIndex) {
        this.BounceIcon(this.m_nBounceType);
        this.m_pLayerMgr.ActiveLayer(nIndex);
    }
    BounceIcon(nType) {
        this.m_nBounceStep = 0;
        this.m_nBounceSign = 1;
        let pLayer = this.m_pLayerMgr.m_pActiveLayer;
        if (pLayer) {
            pLayer.m_pIconMgr.Update(this.m_nBounceType, this.m_nBounceStep / 128.0);
        }
        this.m_nBounceType = nType;
    }
    version() {
        return 1000;
    }
    Active(bActive) {
        this.m_pLayerMgr.Active(bActive);
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_pLayerMgr.UnSerialize(pReader);
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("NavChartDC.UnSerialize(): Bad end!");
        }
    }
}
NavChartDC.DC = null;
class NavChartMgr {
    constructor(nWork) {
        this.m_nWork = 0;
        this.m_mPointHeap = null;
        this.m_mAdjoinHeap = null;
        this.m_mEdgeHeap = null;
        this.m_mLandmarkHeap = null;
        this.m_mLayerHeap = null;
        this.m_pActiveLayer = null;
        this.m_pSceneRoot = null;
        this.m_pLayerList = null;
        this.m_aTempAdjoin = null;
        let nHeapID = ((nWork + 1) | 0xFFFFFF00) >>> 0;
        this.m_nWork = nWork;
        this.m_mPointHeap = new HeapHandle(NPoint, nHeapID);
        this.m_mAdjoinHeap = new HeapHandle(NAdjoin, nHeapID);
        this.m_mEdgeHeap = new HeapHandle(NEdge, nHeapID);
        this.m_mLandmarkHeap = new HeapHandle(NLandmark, nHeapID);
        this.m_mLayerHeap = new HeapHandle(NavChart, nHeapID);
        this.m_mPointHeap.InitHeap();
        this.m_mAdjoinHeap.InitHeap();
        this.m_mEdgeHeap.InitHeap();
        this.m_mLandmarkHeap.InitHeap();
        this.m_mLayerHeap.InitHeap();
        this.m_pActiveLayer = null;
        this.m_pSceneRoot = null;
        this.m_pLayerList = new Array();
        this.m_aTempAdjoin = [null, null];
    }
    version() {
        return 1000;
    }
    Active(bActive) {
        if (this.m_pSceneRoot != null) {
            this.m_pSceneRoot.SetActive(bActive);
        }
    }
    ActiveLayer(nIndex) {
        let pLayer = this.m_pLayerList[nIndex];
        if (this.m_pActiveLayer != null && this.m_pActiveLayer.m_pLayerRoot != null) {
            this.m_pActiveLayer.m_pLayerRoot.SetActive(false);
        }
        this.m_pActiveLayer = pLayer;
        if (this.m_pSceneRoot != null && this.m_pActiveLayer.m_pLayerRoot != null) {
            this.m_pActiveLayer.m_pLayerRoot.SetActive(true);
        }
    }
    GetLayer(nIndex) {
        return this.m_pLayerList[nIndex];
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        this.m_pSceneRoot = new GameObject("-NavChart Root", GameObjectType.Empty);
        this.m_pSceneRoot.parent = MiaokitDC.DC.GetWork(this.m_nWork).m_pWorkRoot;
        let nVersion = pReader.ReadUInt32();
        let nWork = pReader.ReadInt32();
        pReader.ReadUInt32();
        pReader.ReadUInt32();
        pReader.ReadUInt32();
        pReader.ReadUInt32();
        pReader.ReadUInt32();
        this.m_mPointHeap.InitHeap(pReader);
        this.m_mAdjoinHeap.InitHeap(pReader);
        this.m_mEdgeHeap.InitHeap(pReader);
        this.m_mLandmarkHeap.InitHeap(pReader);
        this.m_mLayerHeap.InitHeap(pReader);
        if (nWork != this.m_nWork) {
            for (let pPoint of this.m_mPointHeap) {
                pPoint.m_mHandle.Heap = this.m_mPointHeap;
                pPoint.m_mLayer.Heap = this.m_mLayerHeap;
                pPoint.m_mAdjoinList.Heap = this.m_mAdjoinHeap;
                pPoint.m_mLandmark.Heap = this.m_mLandmarkHeap;
            }
            for (let pAdjoin of this.m_mAdjoinHeap) {
                pAdjoin.m_mHandle.Heap = this.m_mAdjoinHeap;
                pAdjoin.m_mAdjPoint.Heap = this.m_mPointHeap;
                pAdjoin.m_mEdge.Heap = this.m_mEdgeHeap;
            }
            for (let pEdge of this.m_mEdgeHeap) {
                pEdge.m_mHandle.Heap = this.m_mEdgeHeap;
                pEdge.m_mLeftPoint.Heap = this.m_mPointHeap;
                pEdge.m_mRightPoint.Heap = this.m_mPointHeap;
            }
            for (let pLandmark of this.m_mLandmarkHeap) {
                pLandmark.m_mHandle.Heap = this.m_mLandmarkHeap;
                pLandmark.m_mPoint.Heap = this.m_mPointHeap;
            }
            for (let pLayer of this.m_mLayerHeap) {
                pLayer.m_mHandle.Heap = this.m_mLayerHeap;
                pLayer.m_mPointList.Heap = this.m_mPointHeap;
                pLayer.m_mEdgeList.Heap = this.m_mEdgeHeap;
                pLayer.m_mLandmarkList.Heap = this.m_mLandmarkHeap;
                pLayer.m_mAdjoinHeap = this.m_mAdjoinHeap;
            }
        }
        for (let pLayer of this.m_mLayerHeap.GetDefaultList()) {
            pLayer.m_mAdjoinHeap = this.m_mAdjoinHeap;
            pLayer.m_nWork = this.m_nWork;
            pLayer.BuildScene(this.m_pSceneRoot);
            this.m_pLayerList.push(pLayer);
        }
        this.m_pLayerList.sort(function (a, b) {
            if (a.m_nIndex < b.m_nIndex) {
                return -1;
            }
            else if (a.m_nIndex > b.m_nIndex) {
                return 1;
            }
            else {
                return 0;
            }
        });
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("NavChartMgr.UnSerialize(): Bad end!");
        }
    }
    LinkLayers(eUsage, pGateList, pSiteList) {
        let pAdjoinList = this.m_aTempAdjoin[eUsage];
        if (pAdjoinList != null) {
            console.error("NavChartMgr.LinkLayers(): pAdjoinList != null.");
            return;
        }
        pAdjoinList = new Array();
        this.m_aTempAdjoin[eUsage] = pAdjoinList;
        let pWellholeList = new Array();
        let aWellholeIndex = new Array(this.m_pLayerList.length);
        for (let pLandmark of this.m_mLandmarkHeap) {
            let pPoint = pLandmark.m_mPoint.Object;
            if (pPoint.m_eUsage == eUsage) {
                if (pLandmark.m_nType > 0 && pLandmark.m_nType < 4) {
                    let pLayer = pPoint.m_mLayer.Object;
                    let nLayer = pLayer.m_nIndex;
                    let nIndex = nLayer * 1024 + (++aWellholeIndex[nLayer]);
                    pWellholeList.push({ m_nIndex: nIndex, m_pWellhole: pLandmark });
                }
                if (pLandmark.m_nType > 4 && pLandmark.m_nType < 8) {
                    pGateList.push(pLandmark);
                }
                pSiteList.push(pLandmark);
            }
        }
        pWellholeList.sort(function (a, b) {
            if (a.m_nIndex < b.m_nIndex) {
                return -1;
            }
            else if (a.m_nIndex > b.m_nIndex) {
                return 1;
            }
            else {
                return 0;
            }
        });
        for (let i = 0; i < pWellholeList.length; i++) {
            let pLandmark = pWellholeList[i].m_pWellhole;
            for (let j = i + 1; j < pWellholeList.length; j++) {
                let pNextLandmark = pWellholeList[j].m_pWellhole;
                if (pLandmark.m_nType == pNextLandmark.m_nType && pLandmark.m_nNumber == pNextLandmark.m_nNumber) {
                    let pPoint0 = pLandmark.m_mPoint.Object;
                    let pPoint1 = pNextLandmark.m_mPoint.Object;
                    let pAdjoin0 = pPoint0.m_mAdjoinList.CreateData().Object;
                    let pAdjoin1 = pPoint1.m_mAdjoinList.CreateData().Object;
                    pAdjoinList.push(pAdjoin0);
                    pAdjoinList.push(pAdjoin1);
                    pAdjoin0.m_mAdjPoint.Number = pPoint1.m_mHandle.Number;
                    pAdjoin0.m_nLength = -1.0;
                    pAdjoin0.m_mEdge.Number = 0;
                    pAdjoin1.m_mAdjPoint.Number = pPoint0.m_mHandle.Number;
                    pAdjoin1.m_nLength = -1.0;
                    pAdjoin1.m_mEdge.Number = 0;
                    break;
                }
            }
        }
    }
    DelinkLayers(eUsage) {
        let pAdjoinList = this.m_aTempAdjoin[eUsage];
        if (pAdjoinList != null) {
            for (let pAdjoin of pAdjoinList) {
                pAdjoin.m_mHandle.Destroy();
            }
            this.m_aTempAdjoin[eUsage] = null;
        }
    }
    CollectPoint(eUsage, pPointList) {
        for (let pPoint of this.m_mPointHeap) {
            if (pPoint.m_eUsage == eUsage) {
                for (let pAdjoin of pPoint.m_mAdjoinList) {
                    if (pAdjoin.m_nLength >= 0.0) {
                        pAdjoin.m_nLength = pAdjoin.m_mEdge.Object.m_nLength;
                    }
                    else if (pAdjoin.m_nLength < -1.0) {
                        pAdjoin.m_nLength = -pAdjoin.m_nLength;
                    }
                }
                pPoint.m_nIndex = pPointList.length;
                pPointList.push(pPoint);
            }
        }
    }
}
class NavChart {
    constructor() {
        this.m_mHandle = new Handle(NavChart, 0);
        this.m_mPointList = new ListHandle(NPoint, 0);
        this.m_mEdgeList = new ListHandle(NEdge, 0);
        this.m_mLandmarkList = new ListHandle(NLandmark, 0);
        this.m_nIndex = 0;
        this.m_nWork = 0;
        this.m_mAdjoinHeap = null;
        this.m_pLayerRoot = null;
        this.m_pIconMgr = null;
        this.m_pIconMgr = new NIconMgr();
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(NavChart, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mPointList.Number = pReader.ReadUInt32();
        this.m_mEdgeList.Number = pReader.ReadUInt32();
        this.m_mLandmarkList.Number = pReader.ReadUInt32();
        this.m_nIndex = pReader.ReadInt32();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("NLayer.UnSerialize(): Bad end!");
        }
    }
    BuildScene(pSceneRoot) {
        if (pSceneRoot != null) {
            this.m_pLayerRoot = new GameObject("NavChartLayer", GameObjectType.Empty);
            this.m_pLayerRoot.parent = pSceneRoot;
            for (let pLandmark of this.m_mLandmarkList) {
                pLandmark.CreateObject(this.m_pLayerRoot, this.m_pIconMgr);
            }
            this.m_pLayerRoot.SetActive(false);
        }
    }
}
NavChart.g_pContext = new HeapContext(NavChart);
var NUsageType;
(function (NUsageType) {
    NUsageType[NUsageType["Navigation"] = 0] = "Navigation";
    NUsageType[NUsageType["Routing"] = 1] = "Routing";
})(NUsageType || (NUsageType = {}));
class NPoint {
    constructor() {
        this.m_mHandle = new Handle(NPoint, 0);
        this.m_mLayer = new Handle(NavChart, 0);
        this.m_mAdjoinList = new ListHandle(NAdjoin, 0);
        this.m_mLandmark = new Handle(NLandmark, 0);
        this.m_mPosition = new Vector3(0.0, 0.0, 0.0);
        this.m_nDegrees = 0;
        this.m_eUsage = NUsageType.Navigation;
        this.m_nIndex = 0;
        this.m_mClone = null;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(NPoint, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mLayer.Number = pReader.ReadUInt32();
        this.m_mAdjoinList.Number = pReader.ReadUInt32();
        this.m_mLandmark.Number = pReader.ReadUInt32();
        this.m_mPosition.x = pReader.ReadSingle();
        this.m_mPosition.y = pReader.ReadSingle();
        this.m_mPosition.z = pReader.ReadSingle();
        this.m_nDegrees = pReader.ReadInt32();
        this.m_eUsage = pReader.ReadInt32();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("NPoint.UnSerialize(): Bad end!");
        }
    }
}
NPoint.g_pContext = new HeapContext(NPoint);
class NAdjoin {
    constructor() {
        this.m_mHandle = new Handle(NAdjoin, 0);
        this.m_mAdjPoint = new Handle(NPoint, 0);
        this.m_mEdge = new Handle(NEdge, 0);
        this.m_nLength = 0;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(NAdjoin, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mAdjPoint.Number = pReader.ReadUInt32();
        this.m_mEdge.Number = pReader.ReadUInt32();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("NAdjoin.UnSerialize(): Bad end!");
        }
    }
}
NAdjoin.g_pContext = new HeapContext(NAdjoin);
class NEdge {
    constructor() {
        this.m_mHandle = new Handle(NEdge, 0);
        this.m_mLeftPoint = new Handle(NPoint, 0);
        this.m_mRightPoint = new Handle(NPoint, 0);
        this.m_nLength = 0.0;
        this.m_eUsage = NUsageType.Navigation;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(NEdge, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mLeftPoint.Number = pReader.ReadUInt32();
        this.m_mRightPoint.Number = pReader.ReadUInt32();
        this.m_nLength = pReader.ReadSingle();
        this.m_eUsage = pReader.ReadInt32();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("NEdge.UnSerialize(): Bad end!");
        }
    }
}
NEdge.g_pContext = new HeapContext(NEdge);
class NLandmark {
    constructor() {
        this.m_mHandle = new Handle(NLandmark, 0);
        this.m_mPoint = new Handle(NPoint, 0);
        this.m_pAAreaLabel = null;
        this.m_pObject = null;
        this.m_pName = "位置点";
        this.m_pIconUrl = null;
        this.m_nIconType = 0;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(NLandmark, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mPoint.Number = pReader.ReadUInt32();
        this.m_pSerial = pReader.ReadString();
        this.m_nType = pReader.ReadInt32();
        this.m_nNumber = pReader.ReadInt32();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("NLandmark.UnSerialize(): Bad end!");
        }
    }
    CreateObject(pParent, pIconMgr) {
        if (pParent != null) {
            if (MiaokitDC.DC.m_pNavigator.BindSiteData(this)) {
                if (this.m_nIconType > 1) {
                    let mPosition = Vector3.Clone(this.m_mPoint.Object.m_mPosition);
                    mPosition.y = 0.05;
                    pIconMgr.Add(mPosition, this.m_pIconUrl, this.m_nIconType, pParent);
                }
            }
        }
    }
    TypeName() {
        let pTypeName = "";
        switch (this.m_nType) {
            case 1:
                pTypeName = "楼梯";
                break;
            case 2:
                pTypeName = "电梯";
                break;
            case 3:
                pTypeName = "手扶梯";
                break;
            case 5:
                pTypeName = "出口";
            case 6:
                pTypeName = "入口";
                break;
            case 7:
                pTypeName = "出入口";
                break;
            default:
                break;
        }
        return pTypeName;
    }
}
NLandmark.g_pContext = new HeapContext(NLandmark);
class NNavigator {
    constructor() {
        this.m_eUsage = NUsageType.Navigation;
        this.m_bLinked = false;
        this.m_bFixedStart = false;
        this.m_pStart = null;
        this.m_aRouting = null;
        this.m_aRoutingDist = null;
        this.m_aPoint = null;
        this.m_aGateType = null;
        this.m_pSiteList = null;
        this.m_pGateList = null;
        this.m_pTempAdjoin = null;
        this.m_pSiteData = null;
        this.m_aCurPath = null;
    }
    FindPath(pStartSerial, pEndSerial, nGateType) {
        if (this.m_aCurPath != null) {
            for (let pPath of this.m_aCurPath) {
                pPath.DestoryObject();
            }
            this.m_aCurPath = null;
        }
        this.InitPath(pStartSerial, false, nGateType);
        if (this.m_pStart == null || this.m_pStart.m_mLandmark.Object.m_pSerial != pStartSerial) {
            return null;
        }
        let pEndPoint = null;
        for (let pLandmark of this.m_pSiteList) {
            if (pEndSerial == pLandmark.m_pSerial) {
                pEndPoint = pLandmark.m_mPoint.Object;
                if (pEndPoint != null) {
                    break;
                }
            }
        }
        if (pEndPoint != null) {
            if (nGateType == 0) {
                nGateType = this.m_aGateType[pEndPoint.m_nIndex];
            }
            this.m_aCurPath = this.FindPath2(pEndPoint.m_nIndex, nGateType);
            if (this.m_aCurPath == null)
                return null;
            for (let i = 0; i < this.m_aCurPath.length; i++) {
                let pPath = this.m_aCurPath[i];
                let pPathPassage1 = null;
                for (let j = 0; j < pPath.m_aPath.length - 1; j++) {
                    let pPathPassage2 = new PathPassage();
                    pPathPassage2.m_pStarPos = pPath.m_aPath[j];
                    pPathPassage2.m_pEndPos = pPath.m_aPath[j + 1];
                    pPathPassage2.m_pV3Lines = Vector3.Sub(pPathPassage2.m_pEndPos, pPathPassage2.m_pStarPos);
                    pPathPassage2.m_pV2Lines = Vector2.Sub(new Vector2(pPathPassage2.m_pEndPos.x, pPathPassage2.m_pEndPos.z), new Vector2(pPathPassage2.m_pStarPos.x, pPathPassage2.m_pStarPos.z));
                    pPathPassage2.m_nDistan = Vector3.Distance(pPathPassage2.m_pEndPos, pPathPassage2.m_pStarPos);
                    if (pPathPassage1 != null) {
                        let Ang = Vector2.AngleTo(pPathPassage1.m_pV2Lines, pPathPassage2.m_pV2Lines);
                        if (Ang < 10 || Ang > 350) {
                            pPathPassage2.m_pStarPos = pPathPassage1.m_pStarPos;
                            pPathPassage2.m_pV3Lines = Vector3.Sub(pPathPassage2.m_pEndPos, pPathPassage2.m_pStarPos);
                            pPathPassage2.m_pV2Lines = Vector2.Sub(new Vector2(pPathPassage2.m_pEndPos.x, pPathPassage2.m_pEndPos.z), new Vector2(pPathPassage2.m_pStarPos.x, pPathPassage2.m_pStarPos.z));
                            pPathPassage2.m_nDistan = Vector3.Distance(pPathPassage2.m_pEndPos, pPathPassage2.m_pStarPos);
                        }
                        else {
                            pPathPassage1.m_pNextAngle = Ang;
                            pPath.m_nDistance += pPathPassage1.m_nDistan;
                            pPath.m_pPathPassage.push(pPathPassage1);
                        }
                    }
                    pPathPassage1 = pPathPassage2;
                    if (j + 1 == pPath.m_aPath.length - 1) {
                        pPath.m_nDistance += pPathPassage1.m_nDistan;
                        pPath.m_pPathPassage.push(pPathPassage1);
                    }
                }
            }
            return this.m_aCurPath;
        }
        return null;
    }
    FindNearest(pStartSerial, pEndType, nGateType) {
        this.InitPath(pStartSerial, false, nGateType);
        if (this.m_pStart == null || this.m_pStart.m_mLandmark.Object.m_pSerial != pStartSerial) {
            return null;
        }
        if (this.m_aRouting[nGateType] == null) {
            if (this.m_aRouting[0] == null) {
                return null;
            }
            nGateType = 0;
        }
        let pEndPointID = null;
        let pEndPointName = null;
        let nEndDist = 0.0;
        for (let pLandmark of this.m_pSiteList) {
            if (pEndType == pLandmark.m_nIconType) {
                let pPoint = pLandmark.m_mPoint.Object;
                let nDist = this.m_aRoutingDist[nGateType][pPoint.m_nIndex];
                if (pEndPointID == null || nEndDist > nDist) {
                    pEndPointID = pLandmark.m_pSerial;
                    pEndPointName = pLandmark.m_pName;
                    nEndDist = nDist;
                }
            }
        }
        return { Name: pEndPointName, ID: pEndPointID };
    }
    FindPath2(nEndPoint, nGateType) {
        if (this.m_aPoint == null || this.m_aRouting == null) {
            return null;
        }
        if (this.m_aRouting[nGateType] == null) {
            if (this.m_aRouting[0] == null) {
                return null;
            }
            nGateType = 0;
        }
        let aRoute = this.m_aRouting[nGateType];
        if (aRoute[nEndPoint] >= 0x0FFFFFFF) {
            return null;
        }
        let nStartPoint = this.m_pStart.m_nIndex;
        let pStack = new Array();
        while (nEndPoint != nStartPoint) {
            pStack.push(this.m_aPoint[nEndPoint]);
            nEndPoint = aRoute[nEndPoint];
        }
        pStack.push(this.m_aPoint[nStartPoint]);
        let pNavPath = new Array();
        let pCurPoints = null;
        let pCurPath = null;
        let nLayerIndex = -1;
        let nSceneIndex = 0;
        let nPathLen = pStack.length;
        for (let i = 0; i < nPathLen; i++) {
            let pPoint = pStack.pop();
            let nCurLayerIndex = pPoint.m_mLayer.Object.m_nIndex;
            let nCurSceneIndex = pPoint.m_mLayer.Object.m_nWork;
            if (nCurSceneIndex != nSceneIndex || nCurLayerIndex != nLayerIndex) {
                if (pCurPath != null && pCurPoints != null) {
                    pCurPath.m_aPath = pCurPoints;
                }
                nLayerIndex = nCurLayerIndex;
                nSceneIndex = nCurSceneIndex;
                pCurPath = new NPath();
                pCurPoints = new Array();
                pNavPath.push(pCurPath);
                pCurPath.m_nWork = nCurSceneIndex;
                pCurPath.m_nLayer = nLayerIndex;
                pCurPath.m_pStartPoint = pPoint;
            }
            pCurPoints.push(Vector3.Clone(pPoint.m_mPosition));
            pCurPath.m_pEndPoint = pPoint;
        }
        if (pCurPath != null && pCurPoints != null) {
            pCurPath.m_aPath = pCurPoints;
        }
        return pNavPath;
    }
    InitPath(pStartSerial, bRelink, nGateType) {
        if (pStartSerial == null) {
            console.error("NNavigator.InitPath(): pStartSerial == null.");
            return;
        }
        if (!this.m_bLinked || bRelink) {
            this.Delink();
            this.Link();
            this.m_pStart = null;
            this.m_aRouting = null;
            this.m_bLinked = true;
        }
        if (!this.m_bFixedStart || this.m_pStart == null) {
            this.m_pStart = null;
            this.m_aRouting = null;
            for (let pLandmark of this.m_pSiteList) {
                if (pLandmark.m_pSerial == pStartSerial) {
                    this.m_pStart = pLandmark.m_mPoint.Object;
                    break;
                }
            }
            if (this.m_pStart != null) {
                let nStartIndex = this.m_pStart.m_nIndex;
                if (this.m_eUsage == NUsageType.Navigation) {
                    this.m_aRouting = [null, null, null, null];
                    this.m_aRoutingDist = [null, null, null, null];
                    let pRouting = this.InitPath2(nStartIndex, 0);
                    this.m_aRouting[0] = pRouting.Path;
                    this.m_aRoutingDist[0] = pRouting.Dist;
                    if (nGateType != 0) {
                        let pRouting = this.InitPath2(nStartIndex, nGateType);
                        this.m_aRouting[nGateType] = pRouting.Path;
                        this.m_aRoutingDist[nGateType] = pRouting.Dist;
                    }
                }
                else {
                    this.m_aRouting = [null];
                    let pRouting = this.InitPath2(nStartIndex, 0);
                    this.m_aRouting[0] = pRouting.Path;
                    this.m_aRoutingDist[0] = pRouting.Dist;
                }
            }
        }
        if (this.m_bFixedStart) {
            this.Delink();
        }
    }
    InitPath2(nBegin, nFirstGateType) {
        let nPointCount = this.m_aPoint.length;
        let aPath = new Array(nPointCount);
        let aGateType = new Array(nPointCount);
        let aGateNum = new Array(nPointCount);
        let aVisited = new Array(nPointCount);
        let aLength = new Array(nPointCount);
        if (nFirstGateType == 0) {
            this.m_aGateType = aGateType;
        }
        for (let i = 0; i < nPointCount; i++) {
            aLength[i] = 0xFFFFFFFF;
            aPath[i] = 0x0FFFFFFF;
            aVisited[i] = false;
            aGateType[i] = 0;
            aGateNum[i] = 0;
        }
        aVisited[nBegin] = true;
        aLength[nBegin] = 0.0;
        aPath[nBegin] = nBegin;
        aGateType[nBegin] = nFirstGateType;
        aGateNum[nBegin] = 0x0FFFFFFF;
        {
            let pPoint = this.m_aPoint[nBegin];
            for (let pAdjoin of pPoint.m_mAdjoinList) {
                let nLength = pAdjoin.m_nLength;
                let nGateType = aGateType[nBegin];
                let nGateNum = aGateNum[nBegin];
                if (nLength < 0.0) {
                    let pLandmark = pPoint.m_mLandmark.Object;
                    if (nGateType == 0) {
                        nLength = 1000.0;
                    }
                    else if (pLandmark.m_nType == nGateType) {
                        nLength = 1000.0;
                        if (pLandmark.m_nNumber != nGateNum) {
                            nLength += 100.0;
                        }
                    }
                    else {
                        nLength = 10000.0;
                    }
                    nGateType = pLandmark.m_nType;
                    nGateNum = pLandmark.m_nNumber;
                }
                let pAdjPoint = pAdjoin.m_mAdjPoint.Object;
                aLength[pAdjPoint.m_nIndex] = nLength;
                aPath[pAdjPoint.m_nIndex] = nBegin;
                aGateType[pAdjPoint.m_nIndex] = nGateType;
                aGateNum[pAdjPoint.m_nIndex] = nGateNum;
            }
        }
        for (let i = 1; i < nPointCount; i++) {
            let nCurLength = 0xFFFFFFFF;
            let nCurIndex = 0;
            for (let j = 0; j < nPointCount; j++) {
                if (aVisited[j] == false && aLength[j] <= nCurLength) {
                    nCurLength = aLength[j];
                    nCurIndex = j;
                }
            }
            aVisited[nCurIndex] = true;
            let pPoint = this.m_aPoint[nCurIndex];
            for (let pAdjoin of pPoint.m_mAdjoinList) {
                let nLength = pAdjoin.m_nLength;
                let nGateType = aGateType[nCurIndex];
                let nGateNum = aGateNum[nCurIndex];
                if (nLength < 0.0) {
                    let pLandmark = pPoint.m_mLandmark.Object;
                    if (nGateType == 0) {
                        nLength = 1000.0;
                    }
                    else if (pLandmark.m_nType == nGateType) {
                        nLength = 1000.0;
                        if (pLandmark.m_nNumber != nGateNum) {
                            nLength += 100.0;
                        }
                    }
                    else {
                        nLength = 10000.0;
                    }
                    nGateType = pLandmark.m_nType;
                    nGateNum = pLandmark.m_nNumber;
                }
                let pAdjPoint = pAdjoin.m_mAdjPoint.Object;
                nLength += nCurLength;
                if (aVisited[pAdjPoint.m_nIndex] == false && aLength[pAdjPoint.m_nIndex] > nLength) {
                    aLength[pAdjPoint.m_nIndex] = nLength;
                    aPath[pAdjPoint.m_nIndex] = nCurIndex;
                    aGateType[pAdjPoint.m_nIndex] = nGateType;
                    aGateNum[pAdjPoint.m_nIndex] = nGateNum;
                }
            }
        }
        return { Path: aPath, Dist: aLength };
    }
    Link() {
        this.m_pSiteList = new Array();
        this.m_pGateList = new Array();
        let pPointList = new Array();
        for (let pWork of MiaokitDC.DC.m_aWork) {
            if (pWork != null) {
                pWork.m_pNavChartDC.m_pLayerMgr.LinkLayers(this.m_eUsage, this.m_pGateList, this.m_pSiteList);
                pWork.m_pNavChartDC.m_pLayerMgr.CollectPoint(this.m_eUsage, pPointList);
            }
        }
        this.m_aPoint = pPointList;
        this.LinkWorks();
    }
    Delink() {
        for (let pWork of MiaokitDC.DC.m_aWork) {
            if (pWork != null) {
                pWork.m_pNavChartDC.m_pLayerMgr.DelinkLayers(this.m_eUsage);
            }
        }
        this.DelinkWorks();
    }
    LinkWorks() {
        this.m_pTempAdjoin = new Array();
        for (let i = 0; i < this.m_pGateList.length; i++) {
            let pLandmark = this.m_pGateList[i];
            for (let j = i + 1; j < this.m_pGateList.length; j++) {
                let pNextLandmark = this.m_pGateList[j];
                if (pLandmark.m_nNumber == pNextLandmark.m_nNumber) {
                    let nLength0 = 1.0;
                    let nLength1 = 1.0;
                    if (pLandmark.m_nType == 7 && pNextLandmark.m_nType == 7) {
                        nLength0 = -1000.0;
                        nLength1 = -1000.0;
                    }
                    else if (pLandmark.m_nType == 5 && pNextLandmark.m_nType == 6) {
                        nLength0 = -1000.0;
                        nLength1 = -100000.0;
                    }
                    else if (pLandmark.m_nType == 6 && pNextLandmark.m_nType == 5) {
                        nLength0 = -100000.0;
                        nLength1 = -1000.0;
                    }
                    if (nLength0 < 0.0 && nLength1 < 0.0) {
                        let pPoint0 = pLandmark.m_mPoint.Object;
                        let pPoint1 = pNextLandmark.m_mPoint.Object;
                        let pAdjoin0 = pPoint0.m_mAdjoinList.CreateData().Object;
                        let pAdjoin1 = pPoint1.m_mAdjoinList.CreateData().Object;
                        this.m_pTempAdjoin.push(pAdjoin0);
                        this.m_pTempAdjoin.push(pAdjoin1);
                        pAdjoin0.m_mAdjPoint = pPoint1.m_mHandle;
                        pAdjoin0.m_nLength = nLength0;
                        pAdjoin0.m_mEdge.Number = 0;
                        pAdjoin1.m_mAdjPoint = pPoint0.m_mHandle;
                        pAdjoin1.m_nLength = nLength1;
                        pAdjoin1.m_mEdge.Number = 0;
                    }
                    break;
                }
            }
        }
    }
    DelinkWorks() {
        if (this.m_pTempAdjoin != null) {
            for (let pAdjoin of this.m_pTempAdjoin) {
                pAdjoin.m_mHandle.Destroy();
            }
            this.m_pTempAdjoin = null;
        }
    }
    BindSiteData(pSite) {
        if (this.m_pSiteData != null) {
            for (let pData of this.m_pSiteData) {
                if (pData.roomID == pSite.m_pSerial) {
                    pSite.m_pName = pData.companyName;
                    pSite.m_pIconUrl = pData.iconUrl;
                    pSite.m_nIconType = pData.HyID;
                    return true;
                }
            }
        }
        return false;
    }
}
class NPath {
    constructor() {
        this.m_aPath = null;
        this.m_pStartPoint = null;
        this.m_pEndPoint = null;
        this.m_pObject = null;
        this.m_nDistance = 0;
        this.m_pPathPassage = [];
    }
    CreateObject() {
        let pParent = MiaokitDC.DC.GetWork(this.m_nWork).m_pNavChartDC.m_pLayerMgr.GetLayer(this.m_nLayer).m_pLayerRoot;
        let pObject = new GameObject("Path", GameObjectType.Line);
        pObject.SetLine(this.m_aPath);
        pObject.parent = pParent;
        this.m_pObject = pObject;
    }
    DestoryObject() {
        this.m_pObject = null;
    }
}
class PathPassage {
    constructor() {
        this.m_nDistan = 0;
        this.m_pNextAngle = 0;
    }
}
class NIconMgr {
    constructor() {
        this.m_pIconList = null;
        this.m_pIconList = new Array();
    }
    Update(nType, nStep) {
        let pItem = this.m_pIconList[nType];
        if (pItem && pItem.m_pObject) {
            let mPosition = pItem.m_pObject.position;
            mPosition.y = nStep * 4.0;
            pItem.m_pObject.position = mPosition;
            pItem.m_pObject.m_pObject.material.size = 16 + 16 * nStep;
            pItem.m_pObject.m_pObject.updateMatrixWorld();
        }
    }
    Add(mPosition, pIconUrl, nType, pParent) {
        let pItem = this.m_pIconList[nType];
        if (pItem == null) {
            pItem = this.m_pIconList[nType] = new NIcon();
            pItem.m_pIconUrl = pIconUrl;
            pItem.m_pObject = new GameObject("", GameObjectType.Point);
            pItem.m_pObject.parent = pParent;
            MiaokitDC.DC.m_pAssetsLoader.PushIcon(pItem);
        }
        pItem.m_pPointList.push(new THREE.Vector3(mPosition.x, 4.0, mPosition.z));
    }
}
class NIcon {
    constructor() {
        this.m_pIconUrl = null;
        this.m_pObject = null;
        this.m_pPointList = [];
    }
    Load(pCallback) {
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadIcon(pThis.m_pIconUrl, function (pMaterial) {
            if (pMaterial != null) {
                pThis.m_pObject.SetPoint(pThis.m_pPointList, pMaterial);
            }
            pCallback();
        });
    }
}
class NMatrix {
    constructor(m, n) {
        this.m = 0;
        this.n = 0;
        this.p = null;
        this.m = m;
        this.n = n;
        this.p = [];
    }
    static Multiply(a, b) {
        if (a.n != b.m) {
            return null;
        }
        let c = new NMatrix(a.m, b.n);
        let i = 0, j = 0, k = 0;
        for (i = 0; i < a.m; i++) {
            for (j = 0; j < b.n; j++) {
                for (c.p[i * c.n + j] = 0, k = 0; k < a.n; k++) {
                    c.p[i * c.n + j] += a.p[i * a.n + k] * b.p[k * b.n + j];
                }
            }
        }
        return c;
    }
    static Transpose(a) {
        let trs = new NMatrix(a.n, a.m);
        for (let i = 0; i < a.m; i++) {
            for (let j = 0; j < a.n; j++) {
                trs.p[j * a.m + i] = a.p[i * a.n + j];
            }
        }
        return trs;
    }
    static Inverse(a) {
        let Temp = new NMatrix(a.m, a.n);
        if (a.m != a.n) {
            return null;
        }
        let det = NMatrix.Determinant(a);
        if (det == 0) {
            return null;
        }
        for (let i = 0; i < Temp.m; i++) {
            for (let j = 0; j < Temp.n; j++) {
                if ((i + j) % 2 == 0) {
                    let mat = NMatrix.Adjunct(a, i, j);
                    Temp.p[i * Temp.m + j] = NMatrix.Determinant(mat) / det;
                }
                else {
                    let mat = NMatrix.Adjunct(a, i, j);
                    Temp.p[i * Temp.m + j] = -NMatrix.Determinant(mat) / det;
                }
            }
        }
        let inv = NMatrix.Transpose(Temp);
        return inv;
    }
    static Determinant(a) {
        let det = 0;
        if (a.m != a.n) {
            return 0;
        }
        if (a.n == 1) {
            det = a.p[0];
            return det;
        }
        else {
            for (let i = 0; i < a.n; i++) {
                if (i % 2 == 0) {
                    let mat = NMatrix.Adjunct(a, i, 0);
                    det += a.p[i * a.n] * NMatrix.Determinant(mat);
                }
                else {
                    let mat = NMatrix.Adjunct(a, i, 0);
                    det -= a.p[i * a.n] * NMatrix.Determinant(mat);
                }
            }
        }
        return det;
    }
    static Adjunct(a, indexm, indexn) {
        let adj = new NMatrix(a.n - 1, a.n - 1);
        for (let i = 0; i < indexm; i++) {
            for (let j = 0; j < indexn; j++) {
                adj.p[i * (a.n - 1) + j] = a.p[i * a.n + j];
            }
            for (let k = indexn + 1; k < a.n; k++) {
                adj.p[i * (a.n - 1) + k - 1] = a.p[i * a.n + k];
            }
        }
        for (let m = indexm + 1; m < a.n; m++) {
            for (let j = 0; j < a.n - 1; j++) {
                adj.p[(m - 1) * (a.n - 1) + j] = a.p[m * a.n + j];
            }
            for (let k = indexn + 1; k < a.n; k++) {
                adj.p[(m - 1) * (a.n - 1) + k - 1] = a.p[m * a.n + k];
            }
        }
        return adj;
    }
}
class NLocalization {
    constructor() {
    }
    GetLocation(aStation) {
        if (Engine.g_pInstance != null) {
            if (Engine.g_pInstance.project != null)
                Engine.g_pInstance.project.TestText2(aStation);
        }
        if (aStation.length < 3) {
            console.error("NLocalization.GetLocation(): aStation.length < 3.");
            return null;
        }
        else if (aStation.length == 3) {
            return this.Trilateral(aStation);
        }
        else {
            aStation.sort(function (a, b) {
                if (a.m_nRssi < b.m_nRssi) {
                    return -1;
                }
                else if (a.m_nRssi > b.m_nRssi) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            let mPosition = new Vector3(0.0, 0.0, 0.0);
            let aPosition = [];
            let aIndex = [0, 1, 2, 0, 1, 2, 0, 2, 3, 1, 2, 3];
            for (let i = 0; i < 4; i++) {
                let nIndex0 = aIndex[i * 3];
                let nIndex1 = aIndex[i * 3 + 1];
                let nIndex2 = aIndex[i * 3 + 2];
                let aStation_ = [aStation[nIndex0], aStation[nIndex1], aStation[nIndex2]];
                aPosition[i] = this.Trilateral(aStation_);
            }
            mPosition.x = ((aPosition[0].x * 8) + (aPosition[1].x * 7) + (aPosition[2].x * 6) + (aPosition[3].x * 5)) / 26;
            mPosition.y = ((aPosition[0].y * 8) + (aPosition[1].y * 7) + (aPosition[2].y * 6) + (aPosition[3].y * 5)) / 26;
            return mPosition;
        }
    }
    Trilateral(aStation) {
        let A = new NMatrix(2, 2);
        {
            for (let i = 0; i < 2; i++) {
                A.p[i * 2] = 2.0 * (aStation[i].m_mPosition.x - aStation[2].m_mPosition.x);
                A.p[i * 2 + 1] = 2.0 * (aStation[i].m_mPosition.y - aStation[2].m_mPosition.y);
            }
        }
        let B = new NMatrix(2, 1);
        {
            for (let i = 0; i < 2; i++) {
                B.p[i] = Math.pow(aStation[i].m_mPosition.x, 2.0)
                    - Math.pow(aStation[2].m_mPosition.x, 2.0)
                    + Math.pow(aStation[i].m_mPosition.y, 2.0)
                    - Math.pow(aStation[2].m_mPosition.y, 2.0)
                    + Math.pow(aStation[2].Distance(), 2.0)
                    - Math.pow(aStation[i].Distance(), 2.0);
            }
        }
        {
            let B_ = B;
            let A_ = A;
            let AT_ = NMatrix.Transpose(A_);
            let AAT_ = NMatrix.Multiply(AT_, A_);
            let AATI_ = NMatrix.Inverse(AAT_);
            if (AATI_ != null) {
                let AATIT_ = NMatrix.Multiply(AATI_, AT_);
                let X = NMatrix.Multiply(AATIT_, B);
                return new Vector3(X.p[0], X.p[1], 0.0);
            }
        }
        return null;
    }
}
class NBaseStation {
    constructor() {
        this.m_mPosition = new Vector3(0.0, 0.0, 0.0);
        this.m_nRssi = 0.0;
        this.m_nBase = 70.0;
        this.m_nFactor = 2.0;
    }
    Distance() {
        let c = Math.pow(10.0, (Math.abs(this.m_nRssi) - this.m_nBase) / (10.0 * this.m_nFactor));
        if (c > 1.5) {
            console.info("distance: ", this.m_nRssi, (Math.sqrt((c * c) - (1.5 * 1.5))));
            return Math.sqrt((c * c) - (1.5 * 1.5));
        }
        console.info("distance_: ", this.m_nRssi, c);
        return 0.0;
    }
}
